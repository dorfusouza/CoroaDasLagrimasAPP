const Jimp = require('jimp-compact');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets');
const RES = path.join(ROOT, 'android', 'app', 'src', 'main', 'res');

// Crop window over assets/nossa-senhora-lagrimas.jpg (1063x1535): face + golden halo,
// same art already used on Home/splash, centered with margin for the adaptive-icon safe zone.
const CX = 501, CY = 305, HALF = 290;

const LEGACY_SIZES = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
const ADAPTIVE_SIZES = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 };

function circleMask(image) {
  const { width, height } = image.bitmap;
  const r = width / 2;
  image.scan(0, 0, width, height, function (x, y, idx) {
    const dx = x - width / 2 + 0.5;
    const dy = y - height / 2 + 0.5;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d > r) {
      this.bitmap.data[idx + 3] = 0;
    } else if (d > r - 1.5) {
      // 1.5px antialiased edge
      this.bitmap.data[idx + 3] = Math.round(255 * (r - d) / 1.5);
    }
  });
  return image;
}

(async () => {
  const src = await Jimp.read(path.join(ASSETS, 'nossa-senhora-lagrimas.jpg'));
  const crop = src.clone().crop(CX - HALF, CY - HALF, HALF * 2, HALF * 2);
  const base = crop.clone().resize(1024, 1024, Jimp.RESIZE_BICUBIC);

  // sample corner color for the adaptive-icon background fallback
  const corner = Jimp.intToRGBA(base.getPixelColor(6, 6));
  const bgHex = '#' + [corner.r, corner.g, corner.b]
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('');
  console.log('Background color sampled:', bgHex);

  // 1) flat square icon used by Expo/app.json + Play Store listing
  await base.clone().writeAsync(path.join(ASSETS, 'icon.png'));
  await base.clone().writeAsync(path.join(ASSETS, 'adaptive-icon-foreground.png'));
  console.log('Wrote assets/icon.png + assets/adaptive-icon-foreground.png');

  // 2) legacy launcher icons (square + round) per density
  for (const [folder, size] of Object.entries(LEGACY_SIZES)) {
    const dir = path.join(RES, `mipmap-${folder}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const square = base.clone().resize(size, size, Jimp.RESIZE_BICUBIC);
    await square.clone().writeAsync(path.join(dir, 'ic_launcher.png'));
    const round = circleMask(square.clone());
    await round.writeAsync(path.join(dir, 'ic_launcher_round.png'));
  }
  console.log('Wrote legacy ic_launcher.png + ic_launcher_round.png');

  // 3) adaptive-icon foreground layer per density (API 26+)
  for (const [folder, size] of Object.entries(ADAPTIVE_SIZES)) {
    const dir = path.join(RES, `mipmap-${folder}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const fg = base.clone().resize(size, size, Jimp.RESIZE_BICUBIC);
    await fg.writeAsync(path.join(dir, 'ic_launcher_foreground.png'));
  }
  console.log('Wrote adaptive ic_launcher_foreground.png');

  // 4) background color resource
  const colorsPath = path.join(RES, 'values', 'colors.xml');
  let colors = fs.readFileSync(colorsPath, 'utf8');
  colors = colors.replace(
    /<color name="iconBackground">#[0-9A-Fa-f]+<\/color>/,
    `<color name="iconBackground">${bgHex.toUpperCase()}</color>`
  );
  fs.writeFileSync(colorsPath, colors);
  console.log('Updated iconBackground in colors.xml');

  // 5) adaptive-icon XML (API 26+)
  const anydpiDir = path.join(RES, 'mipmap-anydpi-v26');
  if (!fs.existsSync(anydpiDir)) fs.mkdirSync(anydpiDir, { recursive: true });
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@color/iconBackground"/>
  <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher.xml'), xml);
  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher_round.xml'), xml);
  console.log('Wrote mipmap-anydpi-v26/ic_launcher(.round).xml');

  console.log('Done. Background color:', bgHex);
})();

const Jimp = require('jimp-compact');
const path = require('path');
const fs = require('fs');

const src = path.join(__dirname, '..', 'assets', 'medalha-frente.png');
const assetsOut = path.join(__dirname, '..', 'assets');
const androidRes = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

const sizes = [1024, 512, 192, 144, 96, 72, 48]; // 1024 for Play store icon, others for various uses
const mipmap = {
  'mdpi': 48,
  'hdpi': 72,
  'xhdpi': 96,
  'xxhdpi': 144,
  'xxxhdpi': 192
};

(async ()=>{
  if (!fs.existsSync(src)) {
    console.error('Source image not found:', src);
    process.exit(1);
  }
  const image = await Jimp.read(src);
  const min = Math.min(image.bitmap.width, image.bitmap.height);
  // center crop to square
  const x = Math.floor((image.bitmap.width - min) / 2);
  const y = Math.floor((image.bitmap.height - min) / 2);
  const square = image.clone().crop(x, y, min, min);

  // ensure assets/icons exists
  const iconsDir = path.join(assetsOut, 'icons');
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir);

  for (const s of sizes) {
    const out = path.join(iconsDir, `icon-${s}.png`);
    await square.clone().resize(s, s, Jimp.RESIZE_BICUBIC).writeAsync(out);
    console.log('Wrote', out);
    if (s === 1024) {
      // also overwrite assets/icon.png used by app.json
      await square.clone().resize(1024,1024,Jimp.RESIZE_BICUBIC).writeAsync(path.join(assetsOut, 'icon.png'));
      console.log('Updated assets/icon.png');
    }
  }

  // create mipmap icons into android res
  for (const [folder, size] of Object.entries(mipmap)) {
    const dir = path.join(androidRes, `mipmap-${folder}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const out = path.join(dir, 'ic_launcher.png');
    await square.clone().resize(size, size, Jimp.RESIZE_BICUBIC).writeAsync(out);
    console.log('Wrote', out);
  }

  // generate a simple adaptive icon foreground/background for API26+
  const anydpi = path.join(androidRes, 'mipmap-anydpi-v26');
  if (!fs.existsSync(anydpi)) fs.mkdirSync(anydpi);
  // foreground
  const fg = path.join(anydpi, 'ic_launcher_foreground.xml');
  const bg = path.join(anydpi, 'ic_launcher_background.xml');
  const fgContent = `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<vector xmlns:android=\"http://schemas.android.com/apk/res/android\" android:width=\"108dp\" android:height=\"108dp\" android:viewportWidth=\"108\" android:viewportHeight=\"108\">\n</vector>`;
  const bgContent = `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<shape xmlns:android=\"http://schemas.android.com/apk/res/android\" android:shape=\"rectangle\">\n  <solid android:color=\"#19204A\"/>\n</shape>`;
  fs.writeFileSync(fg, fgContent);
  fs.writeFileSync(bg, bgContent);
  console.log('Wrote adaptive icon xml placeholders in', anydpi);

  console.log('All icons generated.');
})();
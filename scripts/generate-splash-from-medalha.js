const Jimp = require('jimp-compact');
const path = require('path');

(async ()=>{
  try {
    const assets = path.join(__dirname, '..', 'assets');
    const srcPath = path.join(assets, 'nossa-senhora-lagrimas.jpg');
    const outPath = path.join(assets, 'splash.png');

    const TARGET_W = 1242;
    const TARGET_H = 2436;
    const BG_COLOR = 0x19204AFF; // #19204A with full alpha

    const bg = await new Jimp(TARGET_W, TARGET_H, BG_COLOR);

    const src = await Jimp.read(srcPath);

    // Calculate scale to fit width (with some horizontal padding)
    const padding = Math.floor(TARGET_W * 0.06); // 6% padding left/right
    const maxWidth = TARGET_W - padding * 2;
    const maxHeight = Math.floor(TARGET_H * 0.6); // allow image to occupy up to 60% of height

    let newW = src.bitmap.width;
    let newH = src.bitmap.height;

    const ratio = src.bitmap.width / src.bitmap.height;
    // Fit to maxWidth or maxHeight whichever constrains first
    if (newW > maxWidth) {
      newW = maxWidth;
      newH = Math.round(newW / ratio);
    }
    if (newH > maxHeight) {
      newH = maxHeight;
      newW = Math.round(newH * ratio);
    }

    const resized = src.clone().resize(newW, newH, Jimp.RESIZE_BICUBIC);

    // center horizontally, and place image slightly above center vertically (so lower area free for title/text)
    const x = Math.round((TARGET_W - newW) / 2);
    const y = Math.round((TARGET_H - newH) / 2 - TARGET_H * 0.07);

    // Composite the image onto the background with slight drop shadow effect: draw shadow then image
    const shadow = resized.clone().opacity(0.35).blur(12).color([{apply: 'xor', params: ['#000000']}]);
    await bg.composite(shadow, x+6, y+10, {mode: Jimp.BLEND_SOURCE_OVER});
    await bg.composite(resized, x, y, {mode: Jimp.BLEND_SOURCE_OVER});

    // Add a subtle vignette to edges
    const vignette = new Jimp(TARGET_W, TARGET_H, 0x00000000);
    vignette.scan(0,0,TARGET_W,TARGET_H, function(px,py,idx){
      const dx = Math.abs(px - TARGET_W/2) / (TARGET_W/2);
      const dy = Math.abs(py - TARGET_H/2) / (TARGET_H/2);
      const d = Math.sqrt(dx*dx + dy*dy);
      const alpha = Math.max(0, Math.min(0.7, (d - 0.65) * 1.6));
      // set black with alpha
      this.bitmap.data[idx+0] = 0;
      this.bitmap.data[idx+1] = 0;
      this.bitmap.data[idx+2] = 0;
      this.bitmap.data[idx+3] = Math.round(255 * alpha);
    });
    await bg.composite(vignette, 0, 0, {mode: Jimp.BLEND_MULTIPLY});

    // Optional: add app title text area placeholder (transparent) - skip text rendering to avoid font dependency

    await bg.writeAsync(outPath);
    console.log('Wrote splash to', outPath);
  } catch (err) {
    console.error('Error generating splash:', err);
    process.exit(1);
  }
})();
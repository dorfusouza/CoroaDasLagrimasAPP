const fs = require('fs');
const path = require('path');
const Jimp = require('jimp-compact');

const dir = path.join(__dirname, '..', 'assets');
(async ()=>{
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;
    const p = path.join(dir, f);
    try {
      console.log('Reading', f);
      const image = await Jimp.read(p);
      console.log(' OK:', f, '-', image.bitmap ? `${image.bitmap.width}x${image.bitmap.height}` : 'no-bitmap');
    } catch (err) {
      console.error('FAIL:', f);
      console.error(err.message);
    }
  }
})();
const Jimp = require('jimp-compact');
const path = require('path');

(async ()=>{
  const assets = path.join(__dirname, '..', 'assets');
  // icon 1024x1024
  const icon = await new Jimp(1024, 1024, 0x19204AFF); // background color with full alpha
  await icon.writeAsync(path.join(assets, 'icon.png'));
  console.log('Wrote icon.png');

  // splash 1242x2436
  const splash = await new Jimp(1242, 2436, 0x19204AFF);
  await splash.writeAsync(path.join(assets, 'splash.png'));
  console.log('Wrote splash.png');
})();
import sharp from 'sharp';

const sizes = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

// If your logo is SVG, convert it first
for (const { size, name } of sizes) {
  await sharp('public/BlanketWise-Logo.svg')
    .resize(size, size)
    .png()
    .toFile(`public/${name}`);
}

console.log('Icons generated!');
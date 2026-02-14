/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'ai_workflows.png',
  'seo_analytics.png',
  'web_design_showcase.png'
];

const assetsDir = path.join(__dirname, '..', 'public', 'assets');

async function convertImages() {
  for (const image of images) {
    const inputPath = path.join(assetsDir, image);
    const outputPath = path.join(assetsDir, image.replace('.png', '.webp'));

    console.log(`Converting ${image}...`);

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 4 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✓ Converted ${image}: ${(newSize / 1024).toFixed(0)}KB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`✗ Error converting ${image}:`, error.message);
    }
  }

  console.log('\nAll conversions complete!');
}

convertImages();

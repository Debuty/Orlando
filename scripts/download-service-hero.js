import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        const writeStream = fs.createWriteStream(filepath);
        response.pipe(writeStream);
        
        writeStream.on('finish', () => {
          writeStream.close();
          resolve();
        });
      } else {
        reject(`Failed to download ${url}`);
      }
    }).on('error', reject);
  });
};

const heroImage = {
  url: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=2000&q=80',
  path: 'public/images/services-hero.jpg',
  description: 'Services hero image - luxury resort view'
};

async function downloadHeroImage() {
  try {
    console.log(`Downloading ${heroImage.description}...`);
    await downloadImage(heroImage.url, heroImage.path);
    console.log(`Successfully downloaded ${heroImage.path}`);
  } catch (error) {
    console.error(`Error downloading ${heroImage.path}:`, error);
  }
}

downloadHeroImage(); 
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

const images = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    path: 'public/images/services/modern-design.jpg',
    description: 'Modern design interior'
  },
  {
    url: 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?auto=format&fit=crop&w=1200&q=80',
    path: 'public/images/services/location.jpg',
    description: 'Strategic location'
  },
  {
    url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    path: 'public/images/services/security.jpg',
    description: 'Security and privacy'
  }
];

async function downloadAll() {
  for (const image of images) {
    try {
      console.log(`Downloading ${image.description}...`);
      await downloadImage(image.url, image.path);
      console.log(`Successfully downloaded ${image.path}`);
    } catch (error) {
      console.error(`Error downloading ${image.path}:`, error);
    }
  }
}

downloadAll(); 
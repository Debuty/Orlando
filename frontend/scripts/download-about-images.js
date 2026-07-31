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
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    path: 'public/images/about/story.jpg',
    description: 'Luxury modern chalet exterior'
  },
  {
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    path: 'public/images/about/vision.jpg',
    description: 'Elegant resort pool view'
  },
  {
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    path: 'public/images/about/mission.jpg',
    description: 'High-end resort service'
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
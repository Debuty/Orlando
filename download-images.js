import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f',
    name: 'hero-beach.jpg',
    description: 'Luxury beach for hero section'
  },
  {
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    name: 'blue-diamond-chalet.jpg',
    description: 'Blue Diamond Chalet'
  },
  {
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    name: 'sea-turquoise-chalet.jpg',
    description: 'Sea Turquoise Chalet'
  },
  {
    url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904',
    name: 'bright-star-chalet.jpg',
    description: 'Bright Star Chalet'
  },
  {
    url: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd',
    name: 'city-aerial.jpg',
    description: 'Aerial city view'
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    name: 'beach-aerial.jpg',
    description: 'Aerial beach view'
  },
  {
    url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6',
    name: 'chalet-default.jpg',
    description: 'Default chalet image'
  },
  // New images for reviews section
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    name: 'avatar-fatima.jpg',
    description: 'Fatima avatar'
  },
  {
    url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
    name: 'avatar-ali.jpg',
    description: 'Ali avatar'
  },
  {
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    name: 'avatar-layla.jpg',
    description: 'Layla avatar'
  },
  {
    url: 'https://images.unsplash.com/photo-1584478019937-03c624540711',
    name: 'avatar-placeholder.jpg',
    description: 'Default avatar placeholder'
  },
  {
    url: 'https://images.unsplash.com/photo-1581175907604-8d22ca966d4b',
    name: 'palm-pattern.jpg',
    description: 'Palm leaves pattern background'
  }
];

const downloadImage = (url, filename) => {
  const imagePath = path.join(__dirname, 'public', 'images', filename);
  
  if (!fs.existsSync(path.join(__dirname, 'public', 'images'))) {
    fs.mkdirSync(path.join(__dirname, 'public', 'images'), { recursive: true });
  }

  https.get(`${url}?w=1920&q=80`, (response) => {
    const fileStream = fs.createWriteStream(imagePath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log(`Downloaded: ${filename}`);
      fileStream.close();
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
};

console.log('Starting image downloads...');
images.forEach(img => downloadImage(img.url, img.name)); 
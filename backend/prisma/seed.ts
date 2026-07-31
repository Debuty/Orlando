import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('Missing DATABASE_URL in .env');
}

const pool = new Pool({
  connectionString,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const MOCK_CHALETS = [
  {
    name: 'شاليه التركواز',
    description: 'شاليه فاخر مع إطلالة مباشرة على البحر',
    price: 1200,
    images: ['/images/sea-turquoise-chalet.jpg'],
    features: ['مسبح خاص', 'إطلالة بحرية', 'مطبخ مجهز', 'واي فاي'],
    capacity: 6,
    location: 'الشاطئ الشمالي',
    rating: 4.8,
  },
  {
    name: 'شاليه النجمة',
    description: 'شاليه عصري مع تصميم داخلي أنيق',
    price: 900,
    images: ['/images/bright-star-chalet.jpg'],
    features: ['حديقة خاصة', 'جلسة خارجية', 'مطبخ مجهز', 'واي فاي'],
    capacity: 4,
    location: 'المنطقة السياحية',
    rating: 4.5,
  },
  {
    name: 'شاليه الماسة الزرقاء',
    description: 'شاليه فاخر مع مسبح خاص',
    price: 1500,
    images: ['/images/blue-diamond-chalet.jpg'],
    features: ['مسبح خاص', 'جاكوزي', 'مطبخ مجهز', 'واي فاي'],
    capacity: 8,
    location: 'الشاطئ الجنوبي',
    rating: 4.9,
  },
  {
    name: 'شاليه الحديقة',
    description: 'شاليه هادئ محاط بالحدائق الخضراء',
    price: 800,
    images: ['/images/about/vision.jpg'],
    features: ['حديقة خاصة', 'جلسة شواء', 'مطبخ مجهز', 'انترنت'],
    capacity: 4,
    location: 'المنطقة الغربية',
    rating: 4.3,
  },
  {
    name: 'شاليه المدينة',
    description: 'شاليه عائلي مع إطلالة على المدينة',
    price: 1100,
    images: ['/images/city-aerial.jpg'],
    features: ['تراس خاص', 'مطبخ حديث', 'غرف واسعة', 'موقف سيارات'],
    capacity: 6,
    location: 'المنطقة الشرقية',
    rating: 4.6,
  },
  {
    name: 'شاليه الواحة',
    description: 'شاليه فاخر وسط أشجار النخيل',
    price: 1300,
    images: ['/images/about/story.jpg'],
    features: ['مسبح خاص', 'حديقة نخيل', 'مطبخ مجهز', 'خدمة غرف'],
    capacity: 7,
    location: 'واحة النخيل',
    rating: 4.7,
  },
];

async function main() {
  console.log('Seeding Orlando database...');

  await prisma.qrCode.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.chaletImage.deleteMany();
  await prisma.chalet.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const tenantPassword = await bcrypt.hash('Tenant123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@orlando.com',
      name: 'Village Admin',
      phone: '0500000001',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin id:', admin.id);

  const tenant = await prisma.user.create({
    data: {
      email: 'tenant@orlando.com',
      name: 'أحمد محمد',
      phone: '0501234567',
      passwordHash: tenantPassword,
      role: 'TENANT',
    },
  });

  const chalets = [];
  for (const item of MOCK_CHALETS) {
    const chalet = await prisma.chalet.create({
      data: {
        name: item.name,
        description: item.description,
        location: item.location,
        price: item.price,
        capacity: item.capacity,
        rating: item.rating,
        features: JSON.stringify(item.features),
        isActive: true,
        images: {
          create: item.images.map((url, index) => ({ url, sortOrder: index })),
        },
      },
    });
    chalets.push(chalet);
  }

  const checkIn = new Date();
  checkIn.setUTCDate(checkIn.getUTCDate() + 7);
  checkIn.setUTCHours(0, 0, 0, 0);
  const checkOut = new Date(checkIn);
  checkOut.setUTCDate(checkOut.getUTCDate() + 2);

  await prisma.booking.create({
    data: {
      userId: tenant.id,
      chaletId: chalets[0].id,
      checkIn,
      checkOut,
      guestCount: 2,
      specialRequests: 'قرب المسبح إن أمكن',
      totalPrice: Number(chalets[0].price) * 2,
      status: 'CONFIRMED',
      bookingCode: 'ORD-SEED01',
      payment: {
        create: {
          transactionId: `TXN-SEED-${Date.now()}`,
          status: 'SUCCESS',
        },
      },
      qrCodes: {
        create: {
          token: `QR-SEED-${Date.now()}`,
          status: 'ACTIVE',
          validFrom: checkIn,
          validTo: checkOut,
        },
      },
    },
  });

  await prisma.alert.createMany({
    data: [
      {
        type: 'INFO',
        message: 'تم تأكيد حجز تجريبي ORD-SEED01',
        isRead: false,
      },
      {
        type: 'WARNING',
        message: 'تذكير: راجع توفر الشاليهات للأسبوع القادم',
        isRead: true,
      },
    ],
  });

  console.log('Seed complete.');
  console.log('Admin:  admin@orlando.com / Admin123!');
  console.log('Tenant: tenant@orlando.com / Tenant123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

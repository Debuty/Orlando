import type { Service, ServiceFeature } from '../types';

export const SERVICES_HERO = {
  title: 'خدماتنا',
  subtitle: 'تجربة إقامة لا تُنسى',
  description: 'نقدم مجموعة متكاملة من الخدمات الراقية لضمان إقامة مريحة وممتعة لضيوفنا الكرام'
};

export const MAIN_SERVICES: Service[] = [
  {
    id: 1,
    title: 'حجز الشاليهات',
    description: 'اختر من بين مجموعة متنوعة من الشاليهات الفاخرة المجهزة بأحدث وسائل الراحة',
    icon: 'chalet',
    features: [
      'حجز مباشر عبر الموقع',
      'دفع آمن',
      'إلغاء مجاني',
      'أسعار تنافسية'
    ]
  },
  {
    id: 2,
    title: 'خدمة الغرف',
    description: 'نقدم خدمة غرف على مدار الساعة لتلبية جميع احتياجاتك',
    icon: 'room-service',
    features: [
      'تنظيف يومي',
      'خدمة 24/7',
      'قائمة طعام متنوعة',
      'خدمة غسيل الملابس'
    ]
  },
  {
    id: 3,
    title: 'المرافق الترفيهية',
    description: 'استمتع بمجموعة متنوعة من المرافق الترفيهية المصممة لراحتك',
    icon: 'entertainment',
    features: [
      'مسبح خاص',
      'صالة ألعاب رياضية',
      'منطقة شواء',
      'جلسات خارجية'
    ]
  },
  {
    id: 4,
    title: 'خدمات خاصة',
    description: 'نقدم خدمات مخصصة لتلبية احتياجاتك الخاصة',
    icon: 'vip',
    features: [
      'تنظيم المناسبات',
      'خدمة استقبال VIP',
      'حجز المطاعم',
      'خدمة التوصيل'
    ]
  }
];

export const SERVICE_FEATURES: ServiceFeature[] = [
  {
    id: 1,
    title: 'تصميم عصري',
    description: 'شاليهات مصممة بأحدث الطرز العصرية مع الحفاظ على الطابع التقليدي',
    image: '/images/services/modern-design.jpg'
  },
  {
    id: 2,
    title: 'موقع متميز',
    description: 'موقع استراتيجي يتيح لك الوصول بسهولة إلى أهم المعالم السياحية',
    image: '/images/services/location.jpg'
  },
  {
    id: 3,
    title: 'أمان وخصوصية',
    description: 'نظام أمني متكامل وخصوصية تامة لجميع الضيوف',
    image: '/images/services/security.jpg'
  }
]; 
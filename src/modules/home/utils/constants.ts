export const HOME_CONTENT = {

  featuredChalets: {
    chalets: [
      {
        id: '1',
        tag: 'seaTurquoise',
        name: 'شاليه البحر التركوازي',
        englishName: 'Sea Turquoise Chalet',
        features: 'مسبح خاص، إطلالة بحرية، مطبخ مجهز',
        price: 1200,
        currency: 'ريال'
      },
      {
        id: '2',
        tag: 'brightStar',
        name: 'شاليه النجمة المضيئة',
        englishName: 'Bright Star Chalet',
        features: 'حديقة خاصة، جلسة خارجية، مطبخ مجهز',
        price: 900,
        currency: 'ريال'
      },
      {
        id: '3',
        tag: 'blueDiamond',
        name: 'شاليه الماسة الزرقاء',
        englishName: 'Blue Diamond Chalet',
        features: 'مسبح خاص، جاكوزي، مطبخ مجهز',
        price: 1500,
        currency: 'ريال'
      }
    ]
  },
  reviews: {
    title: 'آراء عملائنا',
    subtitle: 'ماذا يقولون عن تجربتهم في أورلاندو؟',
    testimonials: [
      {
        id: 1,
        tag: 'fatima',
        name: 'فاطمة العثمان',
        title: 'الاختيار الأمثل',
        content: 'قضينا أجمل الأوقات في شاليهات أورلاندو. الخدمة ممتازة والموقع مميز.',
        avatar: '/images/avatar-fatima.jpg'
      },
      {
        id: 2,
        tag: 'ali',
        name: 'علي السليمان',
        title: 'تجربة فريدة',
        content: 'المكان راقي والخدمات متكاملة. سعيد جداً بتجربتي مع أورلاندو.',
        avatar: '/images/avatar-ali.jpg'
      },
      {
        id: 3,
        tag: 'layla',
        name: 'ليلى الرحمن',
        title: 'أفضل خدمة',
        content: 'الإطلالة رائعة والشاليهات نظيفة ومجهزة بالكامل. تجربة تستحق التكرار.',
        avatar: '/images/avatar-layla.jpg'
      }
    ]
  },
} as const; 
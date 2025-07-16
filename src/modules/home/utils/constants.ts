export const HOME_CONTENT = {
  hero: {
    welcomeText: 'مرحباً بك في منتجع أورلاندو',
    subText: 'عطلتك الصيفية تبدأ من هنا',
    buttons: {
      browse: 'ابدأ التصفح',
      createAccount: 'أنشئ حسابك الآن'
    }
  },
  whyOrlando: {
    title: 'لماذا أورلاندو؟',
    subtitle: 'تجربة استثنائية تنتظرك',
    features: [
      {
        id: 'security',
        title: 'آمن وصيانة',
        description: 'فريق أمني وصيانة متاحة على مدار الساعة',
        icon: 'ShieldCheckIcon'
      },
      {
        id: 'pricing',
        title: 'أسعار تنافسية',
        description: 'أفضل قيمة مقابل خدمات ومنتجات فاخرة',
        icon: 'CurrencyDollarIcon'
      },
      {
        id: 'location',
        title: 'موقع متميز',
        description: 'موقع الشاليهات على السواحل الراقية',
        icon: 'MapPinIcon'
      },
      {
        id: 'services',
        title: 'خدمات متكاملة',
        description: 'خدمات ضيافة متكاملة للتسوق والطبخ والتنظيف',
        icon: 'StarIcon'
      }
    ]
  },
  featuredChalets: {
    title: 'شاليهاتنا المميزة',
    subtitle: 'اختر مسكنك المثالي لقضاء عطلة لا تُنسى',
    chalets: [
      {
        id: '1',
        name: 'شاليه البحر التركوازي',
        englishName: 'Sea Turquoise Chalet',
        features: 'مسبح خاص، إطلالة بحرية، مطبخ مجهز',
        price: 1200,
        currency: 'ريال'
      },
      {
        id: '2',
        name: 'شاليه النجمة المضيئة',
        englishName: 'Bright Star Chalet',
        features: 'حديقة خاصة، جلسة خارجية، مطبخ مجهز',
        price: 900,
        currency: 'ريال'
      },
      {
        id: '3',
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
        name: 'فاطمة العثمان',
        title: 'الاختيار الأمثل',
        content: 'قضينا أجمل الأوقات في شاليهات أورلاندو. الخدمة ممتازة والموقع مميز.',
        avatar: '/images/avatar-fatima.jpg'
      },
      {
        id: 2,
        name: 'علي السليمان',
        title: 'تجربة فريدة',
        content: 'المكان راقي والخدمات متكاملة. سعيد جداً بتجربتي مع أورلاندو.',
        avatar: '/images/avatar-ali.jpg'
      },
      {
        id: 3,
        name: 'ليلى الرحمن',
        title: 'أفضل خدمة',
        content: 'الإطلالة رائعة والشاليهات نظيفة ومجهزة بالكامل. تجربة تستحق التكرار.',
        avatar: '/images/avatar-layla.jpg'
      }
    ]
  },
  cta: {
    title: 'هل أنت مستعد لقضاء عطلتك المثالية؟',
    subtitle: 'لا تنتظر أكثر، احجز شاليهك الآن واستمتع بتجربة لا مثيل لها في منتجع أورلاندو',
    buttons: {
      browse: 'تصفح الشاليهات',
      createAccount: 'أنشئ حسابك الآن'
    }
  }
} as const; 
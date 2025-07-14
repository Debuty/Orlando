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
        id: 'blue-diamond',
        name: 'فيلا علي البحر',
        englishName: 'Seaside Villa',
        features: 'With a pool and private garden',
        price: 1800,
        currency: 'ريال'
      },
      {
        id: 'sea-turquoise',
        name: 'قصر علي البحر',
        englishName: 'Seaside Palace',
        features: 'With sea view and private beach',
        price: 1500,
        currency: 'ريال'
      },
      {
        id: 'bright-star',
        name: 'فيلا 4 غرف',
        englishName: '4-Bedroom Villa',
        features: 'With inner courtyard',
        price: 1200,
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
        avatar: '/images/avatar-fatima.jpg'
      },
      {
        id: 2,
        name: 'علي السليمان',
        title: 'تجربة فريدة',
        avatar: '/images/avatar-ali.jpg'
      },
      {
        id: 3,
        name: 'ليلى الرحمن',
        title: 'أفضل خدمة',
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
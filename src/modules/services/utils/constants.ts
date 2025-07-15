import type { Service, ServiceFeature } from '../types';

export const SERVICES_HERO = {
  title: 'خدمات منتجعات أورلاندو',
  subtitle: 'نحن نهتم براحتك ونقدم لك تجربة متكاملة على مدار العام'
};

export const MAIN_SERVICES: Service[] = [
  {
    id: 1,
    title: 'أمن وحراسة 24/7',
    description: 'نظام أمني متكامل مع كاميرات مراقبة وبوابات تحكم إلكترونية للمداخل والمخارج',
    icon: 'security'
  },
  {
    id: 2,
    title: 'صيانة دورية',
    description: 'فريق فني متخصص جاهز على مدار الساعة لحل أي مشكلة قد تقف في طريقك',
    icon: 'maintenance'
  },
  {
    id: 3,
    title: 'حمامات سباحة متنوعة',
    description: 'حمامات سباحة مصممة خصيصاً للكبار وأخرى آمنة مخصصة للأطفال',
    icon: 'pool'
  },
  {
    id: 4,
    title: 'شاطئ خاص',
    description: 'وصول مباشر وآمن إلى الشاطئ لتستمتع بالرمال الذهبية',
    icon: 'beach'
  },
  {
    id: 5,
    title: 'منطقة ألعاب للأطفال',
    description: 'بيئة لعب آمنة ومتنوعة ومجهزة بأحدث الألعاب الترفيهية لأطفالك',
    icon: 'playground'
  },
  {
    id: 6,
    title: 'كافيهات ومطاعم',
    description: 'مجموعة متنوعة من الكافيهات والمطاعم التي تلبي أعلى المستويات والمعايير',
    icon: 'cafe'
  },
  {
    id: 7,
    title: 'خدمة النظافة',
    description: 'خدمة تنظيف احترافية للشاليهات قبل وصولك وعند مغادرتك لضمان أعلى معايير النظافة',
    icon: 'cleaning'
  },
  {
    id: 8,
    title: 'شاليهات مفروشة بالكامل',
    description: 'شاليهات مجهزة بالكامل بأثاث فاخر مريح تضمن لك إقامة مريحة',
    icon: 'furnished'
  }
];

export const WHY_ORLANDO = [
  {
    id: 1,
    title: 'بيئة عائلية',
    description: 'مرافق وخدمات مصممة لتناسب جميع أفراد العائلة وتضمن لهم أجواء ممتعة',
    icon: 'family'
  },
  {
    id: 2,
    title: 'تجربة شاملة',
    description: 'كل ما تحتاجه في مكان واحد، من الترفيه إلى الأسترخاء والمأكولات البحرية',
    icon: 'experience'
  },
  {
    id: 3,
    title: 'راحة متكاملة',
    description: 'نوفر لك كل سبل الراحة من شاليهات فاخرة إلى خدمات على مدار الساعة',
    icon: 'comfort'
  }
]; 
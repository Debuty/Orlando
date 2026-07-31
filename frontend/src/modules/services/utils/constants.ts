import type { Service } from '../types';

export const SERVICES_HERO = {
  title: 'خدمات منتجعات أورلاندو',
  subtitle: 'نحن نهتم براحتك ونقدم لك تجربة متكاملة على مدار العام'
};

export const MAIN_SERVICES: Service[] = [
  {
    id: 1,
    key: 'security',
    title: 'أمن وحراسة 24/7',
    description: 'نظام أمني متكامل مع كاميرات مراقبة وبوابات تحكم إلكترونية للمداخل والمخارج',
    icon: 'security'
  },
  {
    id: 2,
    key: 'maintenance',
    title: 'صيانة دورية',
    description: 'فريق فني متخصص جاهز على مدار الساعة لحل أي مشكلة قد تقف في طريقك',
    icon: 'maintenance'
  },
  {
    id: 3,
    key: 'pool',
    title: 'حمامات سباحة متنوعة',
    description: 'حمامات سباحة مصممة خصيصاً للكبار وأخرى آمنة مخصصة للأطفال',
    icon: 'pool'
  },
  {
    id: 4,
    key: 'beach',
    title: 'شاطئ خاص',
    description: 'وصول مباشر وآمن إلى الشاطئ لتستمتع بالرمال الذهبية',
    icon: 'beach'
  },
  {
    id: 5,
    key: 'playground',
    title: 'منطقة ألعاب للأطفال',
    description: 'بيئة لعب آمنة ومتنوعة ومجهزة بأحدث الألعاب الترفيهية لأطفالك',
    icon: 'playground'
  },
  {
    id: 6,
    key: 'cafe',
    title: 'كافيهات ومطاعم',
    description: 'مجموعة متنوعة من الكافيهات والمطاعم التي تلبي أعلى المستويات والمعايير',
    icon: 'cafe'
  },
  {
    id: 7,
    key: 'cleaning',
    title: 'خدمة النظافة',
    description: 'خدمة تنظيف احترافية للشاليهات قبل وصولك وعند مغادرتك لضمان أعلى معايير النظافة',
    icon: 'cleaning'
  },
  {
    id: 8,
    key: 'furnished',
    title: 'شاليهات مفروشة بالكامل',
    description: 'شاليهات مجهزة بالكامل بأثاث فاخر مريح تضمن لك إقامة مريحة',
    icon: 'furnished'
  }
];

export const WHY_ORLANDO = [
  {
    id: 1,
    key: 'family',
    title: 'بيئة عائلية',
    description: 'مرافق وخدمات مصممة لتناسب جميع أفراد العائلة وتضمن لهم أجواء ممتعة',
    icon: 'family'
  },
  {
    id: 2,
    key: 'experience',
    title: 'تجربة شاملة',
    description: 'كل ما تحتاجه في مكان واحد، من الترفيه إلى الأسترخاء والمأكولات البحرية',
    icon: 'experience'
  },
  {
    id: 3,
    key: 'comfort',
    title: 'راحة متكاملة',
    description: 'نوفر لك كل سبل الراحة من شاليهات فاخرة إلى خدمات على مدار الساعة',
    icon: 'comfort'
  }
]; 
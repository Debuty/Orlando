import type { Chalet } from "../types";

// Temporary mock data until we have a backend
export const MOCK_CHALETS: Chalet[] = [
  {
    id: "1",
    name: "شاليه البحر التركوازي",
    description: "شاليه فاخر مع إطلالة مباشرة على البحر",
    price: 1200,
    images: ["/images/sea-turquoise-chalet.jpg"],
    features: ["مسبح خاص", "إطلالة بحرية", "مطبخ مجهز", "واي فاي"],
    capacity: 6,
    location: "الشاطئ الشمالي",
    rating: 4.8
  },
  {
    id: "2",
    name: "شاليه النجمة المضيئة",
    description: "شاليه عصري مع تصميم داخلي أنيق",
    price: 900,
    images: ["/images/bright-star-chalet.jpg"],
    features: ["حديقة خاصة", "جلسة خارجية", "مطبخ مجهز", "واي فاي"],
    capacity: 4,
    location: "المنطقة السياحية",
    rating: 4.5
  },
  {
    id: "3",
    name: "شاليه الماسة الزرقاء",
    description: "شاليه فاخر مع مسبح خاص",
    price: 1500,
    images: ["/images/blue-diamond-chalet.jpg"],
    features: ["مسبح خاص", "جاكوزي", "مطبخ مجهز", "واي فاي"],
    capacity: 8,
    location: "الشاطئ الجنوبي",
    rating: 4.9
  },
  {
    id: "4",
    name: "شاليه الواحة الهادئة",
    description: "شاليه هادئ محاط بالحدائق الخضراء",
    price: 800,
    images: ["/images/chalet-default.jpg"],
    features: ["حديقة خاصة", "جلسة شواء", "مطبخ مجهز", "انترنت"],
    capacity: 4,
    location: "المنطقة الغربية",
    rating: 4.3
  },
  {
    id: "5",
    name: "شاليه القمر المنير",
    description: "شاليه عائلي مع إطلالة على المدينة",
    price: 1100,
    images: ["/images/chalet-default.jpg"],
    features: ["تراس خاص", "مطبخ حديث", "غرف واسعة", "موقف سيارات"],
    capacity: 6,
    location: "المنطقة الشرقية",
    rating: 4.6
  },
  {
    id: "6",
    name: "شاليه النخيل الذهبي",
    description: "شاليه فاخر وسط أشجار النخيل",
    price: 1300,
    images: ["/images/chalet-default.jpg"],
    features: ["مسبح خاص", "حديقة نخيل", "مطبخ مجهز", "خدمة غرف"],
    capacity: 7,
    location: "واحة النخيل",
    rating: 4.7
  },
  {
    id: "7",
    name: "شاليه السماء الزرقاء",
    description: "شاليه مميز بتصميم عصري وإطلالة بحرية",
    price: 1600,
    images: ["/images/chalet-default.jpg"],
    features: ["شرفة بحرية", "جاكوزي", "مطبخ فاخر", "خدمة كونسيرج"],
    capacity: 8,
    location: "الواجهة البحرية",
    rating: 4.9
  },
  {
    id: "8",
    name: "شاليه الصفاء",
    description: "شاليه هادئ مثالي للاسترخاء",
    price: 950,
    images: ["/images/chalet-default.jpg"],
    features: ["حديقة يوغا", "جلسة تأمل", "مطبخ صحي", "واي فاي"],
    capacity: 4,
    location: "المنطقة الهادئة",
    rating: 4.4
  },
  {
    id: "9",
    name: "شاليه اللؤلؤة",
    description: "شاليه فاخر بتصميم كلاسيكي أنيق",
    price: 1400,
    images: ["/images/chalet-default.jpg"],
    features: ["ديكور فاخر", "مسبح داخلي", "صالة طعام", "خدمة غرف"],
    capacity: 6,
    location: "الحي الراقي",
    rating: 4.8
  },
  {
    id: "10",
    name: "شاليه الريف",
    description: "شاليه ريفي محاط بالطبيعة الخلابة",
    price: 850,
    images: ["/images/chalet-default.jpg"],
    features: ["حديقة واسعة", "موقد حطب", "مطبخ ريفي", "منطقة شواء"],
    capacity: 5,
    location: "المنطقة الريفية",
    rating: 4.5
  },
  {
    id: "11",
    name: "شاليه النسيم",
    description: "شاليه عصري مع نسيم البحر المنعش",
    price: 1250,
    images: ["/images/chalet-default.jpg"],
    features: ["شرفة بحرية", "مسبح خاص", "مطبخ حديث", "واي فاي"],
    capacity: 6,
    location: "الواجهة البحرية",
    rating: 4.7
  },
  {
    id: "12",
    name: "شاليه الأصالة",
    description: "شاليه بتصميم تراثي وخدمات عصرية",
    price: 1150,
    images: ["/images/chalet-default.jpg"],
    features: ["جلسة عربية", "مطبخ تقليدي", "فناء داخلي", "واي فاي"],
    capacity: 7,
    location: "الحي التراثي",
    rating: 4.6
  }
];

export const ITEMS_PER_PAGE = 6; 
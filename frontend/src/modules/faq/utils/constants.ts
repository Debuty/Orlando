import type { FAQSection } from '../types';

export const FAQ_CONTENT = {
  hero: {
    title: 'الأسئلة الشائعة',
    subtitle: 'إجابات على الأسئلة الأكثر شيوعاً حول منتجع أورلاندو'
  }
};

export const FAQ_SECTIONS: FAQSection[] = [
  {
    category: {
      id: 'booking',
      key: 'booking',
      name: 'الحجز والدفع'
    },
    items: [
      {
        id: 'booking-1',
        question: 'كيف يمكنني حجز شاليه؟',
        answer: 'يمكنك الحجز بسهولة من خلال موقعنا الإلكتروني. اختر الشاليه المناسب، وتاريخ الإقامة، ثم اتبع خطوات الحجز البسيطة.',
        category: 'booking',
        key: 'booking1'
      },
      {
        id: 'booking-2',
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل جميع البطاقات الائتمانية الرئيسية (فيزا، ماستركارد) والتحويل البنكي.',
        category: 'booking',
        key: 'booking2'
      }
    ]
  },
  {
    category: {
      id: 'cancellation',
      key: 'cancellation',
      name: 'الإلغاء والتعديل'
    },
    items: [
      {
        id: 'cancel-1',
        question: 'ما هي سياسة الإلغاء؟',
        answer: 'يمكنك الإلغاء مجاناً قبل 48 ساعة من موعد الوصول. بعد ذلك، سيتم تطبيق رسوم.',
        category: 'cancellation',
        key: 'cancel1'
      },
      {
        id: 'cancel-2',
        question: 'هل يمكنني تعديل الحجز؟',
        answer: 'نعم، يمكنك تعديل الحجز قبل 24 ساعة من موعد الوصول، مع مراعاة توفر الشاليهات.',
        category: 'cancellation',
        key: 'cancel2'
      }
    ]
  },
  {
    category: {
      id: 'amenities',
      key: 'amenities',
      name: 'المرافق والخدمات'
    },
    items: [
      {
        id: 'amenities-1',
        question: 'ما هي المرافق المتوفرة في الشاليهات؟',
        answer: 'تشمل المرافق: مسبح خاص، مطبخ مجهز بالكامل، واي فاي مجاني، تكييف مركزي، وموقف سيارات خاص.',
        category: 'amenities',
        key: 'amenities1'
      },
      {
        id: 'amenities-2',
        question: 'هل تتوفر خدمة الغرف؟',
        answer: 'نعم، نوفر خدمة الغرف على مدار الساعة مع قائمة طعام متنوعة.',
          category: 'amenities',
        key: 'amenities2'
      }
    ]
  }
]; 
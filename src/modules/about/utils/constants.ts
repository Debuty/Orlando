import type { AboutValue, AboutStat, TeamMember, AboutStorySection } from '../types';

export const ABOUT_HERO = {
  title: 'مرحباً بكم في أورلاندو',
  subtitle: 'وجهتكم المثالية للراحة والاستجمام',
  description: 'نحن نقدم تجربة فريدة من نوعها في عالم الشاليهات الفاخرة، حيث نجمع بين الراحة والفخامة والخدمة المتميزة'
};

export const ABOUT_STORY: AboutStorySection[] = [
  {
    title: 'قصتنا',
    content: 'بدأت رحلة أورلاندو في عام 2020 برؤية واضحة لتقديم تجربة إقامة استثنائية تجمع بين الفخامة والراحة. نحن نفخر بتقديم شاليهات عصرية مجهزة بأحدث وسائل الراحة لضيوفنا الكرام.',
    image: '/images/about/story.jpg'
  },
  {
    title: 'رؤيتنا',
    content: 'نسعى لأن نكون الوجهة الأولى للباحثين عن الراحة والاستجمام في المملكة العربية السعودية، من خلال تقديم خدمات متميزة وتجربة إقامة لا تُنسى.',
    image: '/images/about/vision.jpg'
  },
  {
    title: 'مهمتنا',
    content: 'تقديم تجربة إقامة استثنائية لضيوفنا من خلال الاهتمام بأدق التفاصيل وتوفير أعلى معايير الجودة والخدمة.',
    image: '/images/about/mission.jpg'
  }
];

export const ABOUT_VALUES: AboutValue[] = [
  {
    id: 1,
    title: 'الجودة',
    description: 'نلتزم بتقديم أعلى معايير الجودة في كل تفصيل من تفاصيل خدماتنا',
    icon: 'quality-star'
  },
  {
    id: 2,
    title: 'الراحة',
    description: 'نضع راحة ضيوفنا في مقدمة أولوياتنا ونسعى لتوفير كل ما يحتاجونه',
    icon: 'comfort-bed'
  },
  {
    id: 3,
    title: 'الخصوصية',
    description: 'نضمن لضيوفنا أعلى مستويات الخصوصية والأمان خلال إقامتهم',
    icon: 'privacy-shield'
  },
  {
    id: 4,
    title: 'الابتكار',
    description: 'نسعى دائماً لتطوير خدماتنا وتقديم حلول مبتكرة لتحسين تجربة ضيوفنا',
    icon: 'innovation-bulb'
  }
];

export const ABOUT_STATS: AboutStat[] = [
  {
    id: 1,
    value: '+50',
    label: 'شاليه فاخر'
  },
  {
    id: 2,
    value: '+1000',
    label: 'ضيف سعيد'
  },
  {
    id: 3,
    value: '24/7',
    label: 'خدمة العملاء'
  },
  {
    id: 4,
    value: '+4.8',
    label: 'تقييم العملاء'
  }
]; 
import React from 'react';
import SectionContainer from '../shared/SectionContainer';

const reviews = [
  {
    id: 1,
    name: 'فاطمة العثمان',
    title: 'تجربة رائعة',
    content: 'قضينا أجمل الأوقات في شاليهات أورلاندو. الخدمة ممتازة والموقع مميز.',
    avatar: '/images/avatar-fatima.jpg'
  },
  {
    id: 2,
    name: 'علي السليمان',
    title: 'خدمة متميزة',
    content: 'المكان راقي والخدمات متكاملة. سعيد جداً بتجربتي مع أورلاندو.',
    avatar: '/images/avatar-ali.jpg'
  },
  {
    id: 3,
    name: 'ليلى الرحمن',
    title: 'موقع استثنائي',
    content: 'الإطلالة رائعة والشاليهات نظيفة ومجهزة بالكامل. تجربة تستحق التكرار.',
    avatar: '/images/avatar-layla.jpg'
  }
];

const ReviewsSection: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <SectionContainer
        title="آراء عملائنا"
        subtitle="ماذا يقول عملاؤنا عن تجربتهم معنا"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{review.name}</h3>
                <p className="text-yellow-500 font-semibold mb-4">{review.title}</p>
                <p className="text-gray-600">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default ReviewsSection; 
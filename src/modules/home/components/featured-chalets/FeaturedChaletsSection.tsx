import React from 'react';
import { Link } from 'react-router-dom';

const chalets = [
  {
    id: 'blue-diamond',
    name: 'شاليه الماس الأزرق',
    features: 'مع مسبح وحديقة خاصة',
    price: 1800,
    image: '/images/blue-diamond-chalet.jpg'
  },
  {
    id: 'sea-turquoise',
    name: 'شاليه الفيروز البحري',
    features: 'إطلالة على البحر وشاطئ خاص',
    price: 1500,
    image: '/images/sea-turquoise-chalet.jpg'
  },
  {
    id: 'bright-star',
    name: 'شاليه النجمة الساطعة',
    features: 'مع فناء داخلي',
    price: 1200,
    image: '/images/bright-star-chalet.jpg'
  }
];

const FeaturedChaletsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">شاليهاتنا المميزة</h2>
          <p className="text-gray-600">اختر مسكنك المثالي لقضاء عطلة لا تُنسى</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chalets.map((chalet) => (
            <Link 
              key={chalet.id}
              to={`/chalets/${chalet.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div 
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${chalet.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{chalet.name}</h3>
                  <p className="text-gray-600 mb-4">{chalet.features}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">
                      {chalet.price} ريال
                      <span className="text-sm text-gray-500 mr-1">/ليلة</span>
                    </span>
                    <span className="text-yellow-500 font-semibold">عرض التفاصيل</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChaletsSection; 
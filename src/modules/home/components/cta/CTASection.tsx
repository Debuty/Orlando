import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">
          هل أنت مستعد لقضاء عطلتك المثالية؟
        </h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          لا تنتظر أكثر، احجز شاليهك الآن واستمتع بتجربة لا مثيل لها في منتجع أورلاندو
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/chalets')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-bold text-lg transition-colors"
          >
            تصفح الشاليهات
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
          >
            أنشئ حسابك الآن
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 
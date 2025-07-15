import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-b from-[#00B5E2] to-[#0072BC]">
      <div className="py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            هل أنت مستعد لقضاء عطلتك المثالية؟
          </h2>
          <p className="text-lg text-white mb-8">
            قم بحجز شاليهك اليوم واستمتع بتجربة لا مثيل لها في منتجع <span className="text-[#00B5E2] font-bold">أورلاندو</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => navigate('/chalets')}
              className="bg-[#00B5E2] hover:bg-[#33C3E7] text-white px-6 py-2.5 rounded-lg font-bold text-base min-w-[160px] transition-colors duration-300"
            >
              تصفح الشاليهات
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-transparent hover:bg-white/5 text-white px-6 py-2.5 rounded-lg font-bold text-base min-w-[160px] transition-colors duration-300 border border-white/80"
            >
              أنشئ حسابك الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 
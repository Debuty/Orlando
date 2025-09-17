import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');
  return (
    <section className="w-full bg-gradient-to-b from-[#00B5E2] to-[#0072BC]">
      <div className="py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-white mb-8">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => navigate('/chalets')}
              className="bg-[#00B5E2] hover:bg-[#33C3E7] text-white px-6 py-2.5 rounded-lg font-bold text-base min-w-[160px] transition-colors duration-300"
            >
              {t('cta.buttons.browse')}
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-transparent hover:bg-white/5 text-white px-6 py-2.5 rounded-lg font-bold text-base min-w-[160px] transition-colors duration-300 border border-white/80"
            >
              {t('cta.buttons.createAccount')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 
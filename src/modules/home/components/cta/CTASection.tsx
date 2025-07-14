import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import { HOME_CONTENT } from '../../utils/constants';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { title, subtitle, buttons } = HOME_CONTENT.cta;

  const handleBrowse = () => navigate('/chalets');
  const handleCreateAccount = () => navigate('/auth/register');

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto">{subtitle}</p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            label={buttons.browse}
            onClick={handleBrowse}
            variant="primary"
          />
          <Button
            label={buttons.createAccount}
            onClick={handleCreateAccount}
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection; 
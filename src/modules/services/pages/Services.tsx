import ServicesHero from '../components/hero/ServicesHero';
import ServicesList from '../components/list/ServicesList';
import ServiceFeatures from '../components/features/ServiceFeatures';

const Services = () => {
  return (
    <div dir="rtl">
      <ServicesHero />
      <ServicesList />
      <ServiceFeatures />
    </div>
  );
};

export default Services; 
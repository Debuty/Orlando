import ServicesHero from '../components/hero/ServicesHero';
import ServicesList from '../components/list/ServicesList';
import WhyOrlando from '../components/why/WhyOrlando';
import CallToAction from '../components/cta/CallToAction';

const Services = () => {
  return (
    <div dir="rtl">
      <ServicesHero />
      <ServicesList />
      <WhyOrlando />
      <CallToAction />
    </div>
  );
};

export default Services; 
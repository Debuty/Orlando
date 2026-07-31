import AboutHero from '../components/hero/AboutHero';
import AboutStory from '../components/story/AboutStory';
import AboutValues from '../components/values/AboutValues';
import AboutStats from '../components/stats/AboutStats';

const About = () => {
  return (
    <div dir="rtl">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutStats />
    </div>
  );
};

export default About; 
import { motion } from 'framer-motion';
import { ABOUT_STORY } from '../../utils/constants';

const AboutStory = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {ABOUT_STORY.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } gap-8 items-center`}
            >
              {section.image && (
                <div className="w-full md:w-1/2">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
              
              <div className={`w-full ${section.image ? 'md:w-1/2' : 'md:w-full'}`}>
                <h3 className="text-3xl font-cairo font-bold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStory; 
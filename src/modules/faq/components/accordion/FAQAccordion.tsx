import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQItem } from '../../types';
import { FaChevronDown } from 'react-icons/fa';

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full flex items-center justify-between p-4 text-right"
          >
            <span className="font-semibold text-lg">{item.question}</span>
            <motion.span
              animate={{ rotate: activeId === item.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[#00B5E2]"
            >
              <FaChevronDown />
            </motion.span>
          </button>
          <AnimatePresence>
            {activeId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion; 
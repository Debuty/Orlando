import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

const menuVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  },
  closed: {
    opacity: 0,
    y: -10,
    height: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.05
    }
  }
};

const menuItemVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.2
    }
  },
  closed: {
    opacity: 0,
    x: 20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.2
    }
  }
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    // Use a slight delay to allow the animation to complete
    const closeMenu = () => {
      setIsMenuOpen(false);
    };
    
    // Start animation immediately but delay state change
    setTimeout(closeMenu, 100);
  };

  // Close menu on route change
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const linkClasses = "text-gray-700 hover:text-gray-900 px-3 py-2 font-semibold text-base tracking-wide transition-colors duration-200";
  const mobileLinkClasses = "block w-full px-3 py-2 text-base font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md tracking-wide transition-all duration-200";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={handleLinkClick} className="text-2xl font-bold text-[#00B5E2]">
            أورلاندو
          </Link>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {isMenuOpen ? (
                <motion.path
                  initial={false}
                  d="M6 18L18 6M6 6l12 12"
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              ) : (
                <motion.path
                  initial={false}
                  d="M4 6h16M4 12h16M4 18h16"
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.svg>
          </motion.button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" onClick={handleLinkClick} className={linkClasses}>
              الرئيسية
            </Link>
            <Link to="/about" onClick={handleLinkClick} className={linkClasses}>
              عن أورلاندو
            </Link>
            <Link to="/chalets" onClick={handleLinkClick} className={linkClasses}>
              جميع الشاليهات
            </Link>
            <Link to="/services" onClick={handleLinkClick} className={linkClasses}>
              الخدمات
            </Link>
            <Link to="/faq" onClick={handleLinkClick} className={linkClasses}>
              أسئلة شائعة
            </Link>
            <Link to="/contact" onClick={handleLinkClick} className={linkClasses}>
              اتصل بنا
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/signup"
              onClick={handleLinkClick}
              className="bg-[#00B5E2] hover:bg-[#33C3E7] text-white px-4 py-2 rounded-lg font-semibold text-base tracking-wide transition-all duration-200"
            >
              تسجيل الدخول / إنشاء حساب
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <motion.div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 shadow-lg">
                <motion.div variants={menuItemVariants}>
                  <Link to="/" onClick={handleLinkClick} className={mobileLinkClasses}>
                    الرئيسية
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link to="/about" onClick={handleLinkClick} className={mobileLinkClasses}>
                    عن أورلاندو
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link to="/chalets" onClick={handleLinkClick} className={mobileLinkClasses}>
                    جميع الشاليهات
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link to="/services" onClick={handleLinkClick} className={mobileLinkClasses}>
                    الخدمات
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link to="/faq" onClick={handleLinkClick} className={mobileLinkClasses}>
                    أسئلة شائعة
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link to="/contact" onClick={handleLinkClick} className={mobileLinkClasses}>
                    اتصل بنا
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/signup"
                    onClick={handleLinkClick}
                    className="block w-full px-3 py-2 text-base font-semibold bg-[#00B5E2] hover:bg-[#33C3E7] text-white rounded-md text-center mt-4 tracking-wide transition-all duration-200"
                  >
                    تسجيل الدخول / إنشاء حساب
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}; 
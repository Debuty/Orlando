import React, { useState, useEffect } from 'react';
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

const NavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-1 md:px-1.5 lg:px-3 py-2 text-sm md:text-sm lg:text-base font-semibold transition-all duration-300 group whitespace-nowrap ${
        isActive ? 'text-[#00B5E2]' : 'text-gray-700 hover:text-[#00B5E2]'
      }`}
    >
      {children}
      <span 
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#00B5E2] transform origin-left transition-transform duration-300 ease-out ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`} 
      />
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      variants={menuItemVariants}
      className="relative"
    >
      <Link
        to={to}
        onClick={onClick}
        className={`block w-full px-3 py-2 text-base font-semibold rounded-md tracking-wide transition-all duration-200 relative overflow-hidden group
          ${isActive 
            ? 'text-[#00B5E2] bg-[#00B5E2]/5' 
            : 'text-gray-700 hover:text-[#00B5E2]'}`}
      >
        <motion.span
          className="absolute inset-0 bg-[#00B5E2]/5 rounded-md"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.2 }
          }}
        />
        <motion.div
          className="relative z-10"
          whileHover={{ 
            x: 10,
            transition: { 
              type: "spring",
              stiffness: 400,
              damping: 25
            }
          }}
        >
          {children}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsMenuOpen(false), 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <nav className="container mx-auto px-2 md:px-3 lg:px-4">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleLinkClick} 
            className="text-xl md:text-xl lg:text-2xl font-bold text-[#00B5E2] whitespace-nowrap hover:opacity-80 transition-opacity duration-200"
          >
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
          <div className="hidden md:flex items-center gap-0.5 md:gap-1 lg:gap-2">
            <NavLink to="/" onClick={handleLinkClick}>الرئيسية</NavLink>
            <NavLink to="/about" onClick={handleLinkClick}>عن أورلاندو</NavLink>
            <NavLink to="/chalets" onClick={handleLinkClick}>جميع الشاليهات</NavLink>
            <NavLink to="/services" onClick={handleLinkClick}>الخدمات</NavLink>
            <NavLink to="/faq" onClick={handleLinkClick}>أسئلة شائعة</NavLink>
            <NavLink to="/contact" onClick={handleLinkClick}>اتصل بنا</NavLink>
            <NavLink to="/dashboard" onClick={handleLinkClick}>لوحة المدير</NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center">
            <Link
              to="/signup"
              onClick={handleLinkClick}
              className="bg-[#00B5E2] hover:bg-[#33C3E7] text-white px-3 md:px-4 lg:px-6 py-2 rounded-lg font-semibold text-sm md:text-sm lg:text-base tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 whitespace-nowrap"
            >
              تسجيل دخول
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <motion.div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 shadow-lg">
                <MobileNavLink to="/" onClick={handleLinkClick}>الرئيسية</MobileNavLink>
                <MobileNavLink to="/about" onClick={handleLinkClick}>عن أورلاندو</MobileNavLink>
                <MobileNavLink to="/chalets" onClick={handleLinkClick}>جميع الشاليهات</MobileNavLink>
                <MobileNavLink to="/services" onClick={handleLinkClick}>الخدمات</MobileNavLink>
                <MobileNavLink to="/faq" onClick={handleLinkClick}>أسئلة شائعة</MobileNavLink>
                <MobileNavLink to="/contact" onClick={handleLinkClick}>اتصل بنا</MobileNavLink>
                <MobileNavLink to="/dashboard" onClick={handleLinkClick}>لوحة المدير</MobileNavLink>
                
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/signup"
                    onClick={handleLinkClick}
                    className="block w-full px-3 py-2 text-base font-semibold bg-[#00B5E2] hover:bg-[#33C3E7] text-white rounded-md text-center mt-4 tracking-wide transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
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
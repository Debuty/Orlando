import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Logo } from './Logo';

const sidebarVariants: Variants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  },
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "afterChildren",
      staggerChildren: 0.05
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
      className={`relative flex items-center w-full px-6 py-3 text-base font-cairo font-bold transition-all duration-300 group overflow-hidden ${
        isActive ? 'text-[#00B5E2] bg-[#00B5E2]/5' : 'text-gray-700 hover:text-[#00B5E2] hover:bg-[#00B5E2]/5'
      }`}
    >
      {/* Active indicator */}
      <motion.div
        className={`absolute right-0 top-0 h-full w-1 bg-[#00B5E2] transform transition-transform duration-300 ${
          isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
        }`}
      />
      
      {/* Text container */}
      <span className="relative z-10 flex items-center justify-between w-full">
        <span className="transform group-hover:translate-x-2 transition-transform duration-300">
          {children}
        </span>
        {isActive && (
          <motion.svg
            className="w-5 h-5 text-[#00B5E2]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        )}
      </span>
    </Link>
  );
};

export const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-40">
        <nav className="container mx-auto px-4">
          <div className="flex h-16 justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={handleLinkClick} 
              className="flex items-center gap-2 hover:opacity-90 transition-all duration-200"
            >
              <Logo />
            </Link>

            {/* Menu Toggle Button */}
            <motion.button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-full p-2 hover:bg-[#00B5E2]/5 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                animate={isSidebarOpen ? "open" : "closed"}
              >
                <motion.span
                  className="w-6 h-0.5 bg-gray-700 block transform origin-center"
                  variants={{
                    open: { rotate: 45, y: 6 },
                    closed: { rotate: 0, y: 0 }
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-gray-700 block transform origin-center"
                  variants={{
                    open: { opacity: 0 },
                    closed: { opacity: 1 }
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-gray-700 block transform origin-center"
                  variants={{
                    open: { rotate: -45, y: -6 },
                    closed: { rotate: 0, y: 0 }
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl z-50 flex flex-col"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-cairo font-bold text-gray-800">القائمة</h2>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-4">
                <NavLink to="/" onClick={handleLinkClick}>الرئيسية</NavLink>
                <NavLink to="/about" onClick={handleLinkClick}>عن أورلاندو</NavLink>
                <NavLink to="/chalets" onClick={handleLinkClick}>جميع الشاليهات</NavLink>
                <NavLink to="/services" onClick={handleLinkClick}>الخدمات</NavLink>
                <NavLink to="/faq" onClick={handleLinkClick}>أسئلة شائعة</NavLink>
                <NavLink to="/contact" onClick={handleLinkClick}>اتصل بنا</NavLink>
                <NavLink to="/dashboard" onClick={handleLinkClick}>لوحة المدير</NavLink>
              </div>

              {/* Auth Button */}
              <div className="p-6 border-t">
                <Link
                  to="/signup"
                  onClick={handleLinkClick}
                  className="block w-full py-3 px-6 bg-[#00B5E2] hover:bg-[#33C3E7] text-white rounded-lg font-cairo font-bold text-center transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                >
                  تسجيل دخول
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}; 
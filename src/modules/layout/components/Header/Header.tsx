import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Logo } from './Logo';
import { changeLang } from '../../../../store/reducers/localeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n/i18n';
import type { RootState } from '../../../../store';

const sidebarVariants: Variants = {
  open: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeOut"
    }
  },
  closed: {
    x: "100%",
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeIn"
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
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const lang = useSelector((state: RootState) => state.locale.lang);
  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isSidebarOpen]);

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };
    
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

let Active_lang = "bg-[#00B5E2] text-white"


  const handleLanguageSwitch = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(changeLang({ dir: lang === 'ar' ? 'rtl' : 'ltr', lang }));
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === 'ar' ? 'rtl' : 'ltr');  
  };

  return (
    <>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-40" style={{ direction: 'ltr' }}>
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
            <button
              onClick={toggleSidebar}
              className="rounded-full p-2 hover:bg-[#00B5E2]/5 transition-colors duration-300 focus:outline-none"
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
              <div className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
                <span
                  className={`w-6 h-0.5 bg-gray-700 block transition-all duration-300 transform origin-center ${
                    isSidebarOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-gray-700 block transition-all duration-300 ${
                    isSidebarOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-gray-700 block transition-all duration-300 transform origin-center ${
                    isSidebarOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
          </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
            <motion.div
            key="sidebar"
            className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl z-50 flex flex-col"
            variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-cairo font-bold text-gray-800">{t('navigation.menu')}</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#00B5E2]/5 transition-colors duration-300 focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Rest of the sidebar content */}
            <div className="flex-1 overflow-y-auto py-4">
              <NavLink to="/" onClick={handleLinkClick}> {t('navigation.home')}</NavLink>
              <NavLink to="/about" onClick={handleLinkClick}> {t('navigation.about')}</NavLink>
              <NavLink to="/chalets" onClick={handleLinkClick}> {t('navigation.chalets')}</NavLink>
              <NavLink to="/services" onClick={handleLinkClick}> {t('navigation.services')}</NavLink>
              <NavLink to="/faq" onClick={handleLinkClick}> {t('navigation.faq')}</NavLink>
              <NavLink to="/contact" onClick={handleLinkClick}> {t('navigation.contact')}</NavLink>
              <NavLink to="/dashboard" onClick={handleLinkClick}> {t('navigation.dashboard')}</NavLink>
            </div>

            {/* Auth Button */}
            <div className="p-6 border-t">
                  <Link
                    to="/signup"
                    onClick={handleLinkClick}
                className="block w-full py-3 px-6 bg-[#00B5E2] hover:bg-[#33C3E7] text-white rounded-lg font-cairo font-bold text-center transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                  >
                  {t('navigation.login')}
                  </Link>
            </div>

            {/* Language Switcher */}
            <div className="p-6 border-t">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-cairo font-medium text-gray-600">{t('language.switch')}</span>
              </div>
              <div className="flex gap-2 mt-3 " style={{ direction:'rtl' }}>
                <button
                  className={`flex-1 py-2 px-4 ${lang === 'ar' ? Active_lang : 'bg-gray-200 text-gray-700'} rounded-lg font-cairo font-bold text-center transition-all duration-300  hover:scale-[1.02]`}
                  onClick={() => handleLanguageSwitch('ar')}
                >
                  {t('language.arabic')}
                </button>
                <button
                  className={`flex-1 py-2 px-4 ${lang === 'en' ? Active_lang : 'bg-gray-200 text-gray-700'} rounded-lg font-cairo font-bold text-center transition-all duration-300  hover:scale-[1.02]`}
                  onClick={() => handleLanguageSwitch('en')}
                >
                  {t('language.english')}
                </button>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
}; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClasses = "text-gray-700 hover:text-gray-900 px-3 py-2 font-semibold text-base tracking-wide transition-colors duration-200";
  const mobileLinkClasses = "block px-3 py-2 text-base font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md tracking-wide transition-all duration-200";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#00B5E2]">
            أورلاندو
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className={linkClasses}>
              الرئيسية
            </Link>
            <Link to="/about" className={linkClasses}>
              عن أورلاندو
            </Link>
            <Link to="/chalets" className={linkClasses}>
              جميع الشاليهات
            </Link>
            <Link to="/services" className={linkClasses}>
              الخدمات
            </Link>
            <Link to="/faq" className={linkClasses}>
              أسئلة شائعة
            </Link>
            <Link to="/contact" className={linkClasses}>
              اتصل بنا
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/signup"
              className="bg-[#00B5E2] hover:bg-[#33C3E7] text-white px-4 py-2 rounded-lg font-semibold text-base tracking-wide transition-all duration-200"
            >
              تسجيل الدخول / إنشاء حساب
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 shadow-lg">
              <Link to="/" className={mobileLinkClasses}>
                الرئيسية
              </Link>
              <Link to="/about" className={mobileLinkClasses}>
                عن أورلاندو
              </Link>
              <Link to="/chalets" className={mobileLinkClasses}>
                جميع الشاليهات
              </Link>
              <Link to="/services" className={mobileLinkClasses}>
                الخدمات
              </Link>
              <Link to="/faq" className={mobileLinkClasses}>
                أسئلة شائعة
              </Link>
              <Link to="/contact" className={mobileLinkClasses}>
                اتصل بنا
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-base font-semibold bg-[#00B5E2] hover:bg-[#33C3E7] text-white rounded-md text-center mt-4 tracking-wide transition-all duration-200"
              >
                تسجيل الدخول / إنشاء حساب
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}; 
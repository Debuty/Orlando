import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            أورلاندو
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              الرئيسية
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              عن أورلاندو
            </Link>
            <Link to="/chalets" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              جميع الشاليهات
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              الخدمات
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              أسئلة شائعة
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              اتصل بنا
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/signup"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium"
            >
              تسجيل الدخول / إنشاء حساب
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}; 
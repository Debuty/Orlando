import { Link } from 'react-router-dom';

export const Header = () => {
  const navigation = [
    { name: 'الشاليهات', href: '/chalets' },
    { name: 'الخدمات', href: '/services' },
    { name: 'عن اورلاندو', href: '/about' },
    { name: 'اتصل بنا', href: '/contact' },
    { name: 'اسالة شائعة', href: '/faq' }, // Ensure this matches the router path
  ];

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Orlando
            </Link>
          </div>
          
          {/* Center navigation links */}
          <div className="hidden flex-1 sm:flex justify-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-blue-600 scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden sm:flex sm:items-center space-x-4 space-x-reverse">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              تسجيل دخول
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200"
            >
              انشاء حساب
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 
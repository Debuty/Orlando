import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="max-w-md mx-auto bg-white rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">تسجيل الدخول</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="البريد الإلكتروني"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="كلمة المرور"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-[#52B4D9] focus:ring-[#52B4D9] border-gray-300 rounded"
              />
              <label className="mr-2 block text-sm text-gray-700">
                تذكرني
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-[#52B4D9] hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#52B4D9] text-white py-2 px-4 rounded-md hover:bg-[#3DA3C9] transition-colors duration-200"
          >
            تسجيل الدخول
          </button>

          <div className="text-center text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <Link to="/signup" className="text-[#52B4D9] hover:underline">
              إنشاء حساب
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type  { RootState }  from "../../../store/index";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const { t } = useTranslation('auth');
  const direction = useSelector((state: RootState) => state.locale.dir);
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
    <div className="container mx-auto px-4 py-8" >
      <div className="max-w-md mx-auto bg-white rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">{t('signup.title')}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1  ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('signup.form.fullName.label')}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t('signup.form.fullName.placeholder')}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1  ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                {t('signup.form.email.label')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('signup.form.email.placeholder')}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1  ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('signup.form.phoneNumber.label')}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder={t('signup.form.phoneNumber.placeholder')}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1  ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('signup.form.password.label')}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('signup.form.password.placeholder')}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1  ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('signup.form.confirmPassword.label')}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('signup.form.confirmPassword.placeholder')}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
            />
          </div>

          <div className={`flex items-center justify-start `}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-[#52B4D9] focus:ring-[#52B4D9] border-gray-300 rounded"
            />
            <label className={`m-2 block text-sm text-gray-700`}>
              {t('signup.form.agreeToTerms')} {" "}
              <Link to="/terms" className="text-[#52B4D9] hover:underline">
                {t('signup.form.termsAndConditions')}
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#52B4D9] text-white py-2 px-4 rounded-md hover:bg-[#3DA3C9] transition-colors duration-200"
          >
              {t('signup.form.submitButton')}
          </button>

          <div className="text-center text-sm text-gray-600">
              {t('signup.form.hasAccount')} {" "}
            <Link to="/login" className="text-[#52B4D9] hover:underline">
              {t('signup.form.login')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup; 
import type { InputHTMLAttributes, ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { setRTL, setLTR, rtlClass } from '../../utils/rtl';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  direction?: 'rtl' | 'ltr';
}

export const Input = ({
  label,
  error,
  className,
  direction = 'rtl',
  onChange,
  ...props
}: InputProps) => {
  const baseStyles = 'w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Auto-detect if input contains Arabic text
    const isArabic = /[\u0600-\u06FF]/.test(e.target.value);
    if (isArabic) {
      setRTL(e.target);
    } else {
      setLTR(e.target);
    }
    
    // Call original onChange if provided
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={rtlClass('w-full text-right', 'w-full text-left', direction === 'rtl')}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          baseStyles,
          error && errorStyles,
          rtlClass('text-right', 'text-left', direction === 'rtl'),
          className
        )}
        dir={direction}
        onChange={handleChange}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input; 
import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

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
  ...props
}: InputProps) => {
  const baseStyles = 'w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
  const directionStyles = direction === 'rtl' ? 'text-right' : 'text-left';

  return (
    <div className={`w-full ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          baseStyles,
          error && errorStyles,
          directionStyles,
          className
        )}
        dir={direction}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input; 
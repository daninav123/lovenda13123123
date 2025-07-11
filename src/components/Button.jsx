import React from 'react';

/**
 * Reusable Button component supporting variants and dark mode
 */
export default function Button({ variant = 'primary', children, className = '', ...props }) {
  const baseClasses = 'px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    success: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

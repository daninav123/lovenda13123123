import React from 'react';

/**
 * Reusable Card component with light/dark mode support
 */
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white/80 backdrop-blur-md shadow rounded-2xl p-4 transition-colors duration-300 ${className}`}>{children}
    </div>
  );
}

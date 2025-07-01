import React from 'react';
export function Card({ children, className = '', ...props }) {
  // Estilo unificado: fondo semitransparente y blur de fondo

    return (
    <div
      className={`bg-white/70 backdrop-blur-md rounded-2xl shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
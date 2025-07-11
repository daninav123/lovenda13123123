import React from 'react';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Paginación">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 border bg-white hover:bg-gray-100 ${currentPage === i + 1 ? 'bg-gray-200' : ''}`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}

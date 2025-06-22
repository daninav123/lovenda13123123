import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';

const ProtocoloLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirigir a la primera pestaña si estamos en la raíz de protocolo
  useEffect(() => {
    if (location.pathname === '/protocolo' || location.pathname === '/protocolo/') {
      navigate('/protocolo/momentos-especiales', { replace: true });
    }
  }, [location.pathname, navigate]);

  const isActive = (path) => {
    return location.pathname === `/protocolo/${path}` || 
           location.pathname === `/protocolo/${path}/`;
  };

  // Si estamos en la raíz, mostrar un mensaje de carga
  if (location.pathname === '/protocolo' || location.pathname === '/protocolo/') {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Protocolo de la Boda</h1>
      
      {/* Navegación por pestañas */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
        {[
          { path: 'momentos-especiales', label: 'Momentos Especiales' },
          { path: 'timing', label: 'Timing' },
          { path: 'checklist', label: 'Checklist' },
          { path: 'ayuda-ceremonia', label: 'Ayuda Ceremonia' },
        ].map((tab) => (
          <Link
            key={tab.path}
            to={`/protocolo/${tab.path}`}
            className={`px-4 py-2 rounded-t-lg font-medium whitespace-nowrap ${
              isActive(tab.path)
                ? 'bg-white border-t-2 border-l-2 border-r-2 border-blue-500 text-blue-600 font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Contenido de la página */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
      
      {/* Mensaje de depuración */}
      <div className="mt-4 p-3 bg-gray-100 text-sm text-gray-600 rounded">
        <p>Ruta actual: {location.pathname}</p>
      </div>
    </div>
  );
};

export default ProtocoloLayout;

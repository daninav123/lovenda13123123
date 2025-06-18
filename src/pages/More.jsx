import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Search, Users, Briefcase, Clock, User } from 'lucide-react';

export default function More() {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Más</h1>
        <div className="flex items-center space-x-4">
          <Search size={24} className="text-gray-600 cursor-pointer" />
          <img src="https://via.placeholder.com/32" alt="Avatar" className="w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
        <button onClick={() => setOpenMenu(openMenu==='invitados'?null:'invitados')} className="bg-white p-4 rounded shadow hover:shadow-md flex flex-col text-left w-full">
          <Users size={32} className="text-blue-600 mb-2" />
          <h2 className="font-semibold mb-1">Invitados</h2>
          <p className="text-sm text-gray-600">Gestiona invitados, seating y diseño de invitaciones.</p>
        </button>
        {openMenu==='invitados' && (
          <div className="absolute bg-white border border-gray-200 rounded shadow mt-2 w-full z-10">
            <Link to="/invitados" className="block px-4 py-2 hover:bg-gray-100">Gestión de invitados</Link>
            <Link to="/invitados/seating" className="block px-4 py-2 hover:bg-gray-100">Seating plan</Link>
            <Link to="/invitados/invitaciones" className="block px-4 py-2 hover:bg-gray-100">Diseño de invitaciones</Link>
          </div>
        )}
      </div>
        <div className="relative">
        <button onClick={() => setOpenMenu(openMenu==='proveedores'?null:'proveedores')} className="bg-white p-4 rounded shadow hover:shadow-md flex flex-col text-left w-full">
          <Briefcase size={32} className="text-blue-600 mb-2" />
          <h2 className="font-semibold mb-1">Proveedores</h2>
          <p className="text-sm text-gray-600">Gestiona proveedores y contratos.</p>
        </button>
        {openMenu==='proveedores' && (
          <div className="absolute bg-white border border-gray-200 rounded shadow mt-2 w-full z-10">
            <Link to="/proveedores" className="block px-4 py-2 hover:bg-gray-100">Gestión de proveedores</Link>
            <Link to="/proveedores/contratos" className="block px-4 py-2 hover:bg-gray-100">Contratos</Link>
          </div>
        )}
      </div>
        <div className="relative">
          <button onClick={() => setOpenMenu(openMenu==='protocolo'?null:'protocolo')} className="bg-white p-4 rounded shadow hover:shadow-md flex flex-col text-left w-full">
            <Clock size={32} className="text-blue-600 mb-2" />
            <h2 className="font-semibold mb-1">Protocolo</h2>
            <p className="text-sm text-gray-600">Define momentos, timing y checklist de protocolo.</p>
          </button>
          {openMenu==='protocolo' && (
            <div className="absolute bg-white border border-gray-200 rounded shadow mt-2 w-full z-10">
              <Link to="/momentos-especiales" className="block px-4 py-2 hover:bg-gray-100">Momentos especiales</Link>
              <Link to="/timing" className="block px-4 py-2 hover:bg-gray-100">Timing</Link>
              <Link to="/checklist" className="block px-4 py-2 hover:bg-gray-100">Checklist</Link>
              <Link to="/ayuda-ceremonia" className="block px-4 py-2 hover:bg-gray-100">Ayuda Ceremonia</Link>
            </div>
          )}
        </div>
        <Link to="perfil" className="bg-white p-4 rounded shadow hover:shadow-md flex flex-col">
          <User size={32} className="text-blue-600 mb-2" />
          <h2 className="font-semibold mb-1">Perfil</h2>
          <p className="text-sm text-gray-600">Configura tu cuenta, roles y suscripciones.</p>
        </Link>
      </div>

      {/* Content */}
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <Outlet />
      </div>
    </div>
  );
}

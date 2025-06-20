import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Nav from './Nav';
import ChatWidget from './ChatWidget';
import ThemeToggle from './ThemeToggle';

export default function MainLayout() {
  const { logoUrl, logout } = useUserContext();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-pastel-yellow text-gray-800 font-sans">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <ThemeToggle className="mx-4" />
        <div className="relative">
          <img src={logoUrl || 'https://via.placeholder.com/32'} alt="Avatar" onClick={() => setOpenMenu(!openMenu)} className="w-8 h-8 rounded-full cursor-pointer" />
          {openMenu && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 space-y-1">
              <Link to="/perfil" className="block px-2 py-1 hover:bg-gray-100">Perfil</Link>
            </div>
          )}
        </div>
      </header>
      <main className="flex-grow p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Nav />
        <ChatWidget />
    </div>
  );
}

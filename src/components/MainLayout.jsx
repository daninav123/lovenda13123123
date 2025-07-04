import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Nav from './Nav';
import ChatWidget from './ChatWidget';
import DefaultAvatar from './DefaultAvatar';


export default function MainLayout() {
  const { logoUrl, logout } = useUserContext();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="relative min-h-screen flex flex-col bg-pastel-yellow text-gray-800 font-sans">
      
        
        <div className="absolute top-4 right-4 z-20">
          <DefaultAvatar onClick={() => setOpenMenu(!openMenu)} className="w-8 h-8 text-gray-800 cursor-pointer" />
          {openMenu && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 space-y-1">
              <Link to="/perfil" className="block px-2 py-1 hover:bg-gray-100">Perfil</Link>
<Link to="/buzon" className="block px-2 py-1 hover:bg-gray-100">Buzón</Link>
            </div>
          )}
        </div>
      
      <main className="flex-grow p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Nav />
        <ChatWidget />
    </div>
  );
}

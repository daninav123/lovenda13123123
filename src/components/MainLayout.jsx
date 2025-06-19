import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import ChatWidget from './ChatWidget';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-pastel-yellow text-gray-800 font-sans">
      <main className="flex-grow p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Nav />
        <ChatWidget />
    </div>
  );
}

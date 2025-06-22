import React, { useState } from 'react';
import { Search, Cpu } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function SeatingPlan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  // Tab state for seating plan
  const [activeTab, setActiveTab] = useState('ceremony');
  // Tables for ceremony and banquet
  const ceremonyTables = [
    { id: 1, name: 'Mesa Ceremonia 1', capacity: 8, x: 50, y: 50, shape: 'circle' },
    { id: 2, name: 'Mesa Ceremonia 2', capacity: 6, x: 200, y: 100, shape: 'rect' },
  ];
  const banquetTables = [
    { id: 3, name: 'Mesa Banquete 1', capacity: 10, x: 100, y: 50, shape: 'circle' },
    { id: 4, name: 'Mesa Banquete 2', capacity: 8, x: 250, y: 120, shape: 'rect' },
  ];
  const tables = activeTab === 'ceremony' ? ceremonyTables : banquetTables;
  // Sample guests (replace with real data)
  const guests = [
    { id: 1, name: 'Ana García' },
    { id: 2, name: 'Luis Martínez' },
  ];

  const filteredGuests = guests.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (  
      {/* Tabs for ceremony/banquet */}
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setActiveTab('ceremony')} className={`px-4 py-2 rounded ${activeTab==='ceremony'?'bg-blue-600 text-white':'bg-gray-200'}`}>
          Ceremonia
        </button>
        <button onClick={() => setActiveTab('banquet')} className={`px-4 py-2 rounded ${activeTab==='banquet'?'bg-blue-600 text-white':'bg-gray-200'}`}>
          Banquete
        </button>
      </div>
      <h1 className="text-2xl font-semibold">Seating Plan - {activeTab==='ceremony'?'Ceremonia':'Banquete'}</h1>
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Seating Plan</h1>
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-6">
          {/* Listado de invitados */}
          <div className="w-1/4 border rounded p-4">
            <div className="flex items-center border rounded px-2 py-1 mb-2">
              <Search size={16} className="mr-2 text-gray-600" />
              <input
                type="text"
                placeholder="Buscar invitados"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="outline-none w-full"
              />
            </div>
            <div className="space-y-2 overflow-auto max-h-[400px]">
              {filteredGuests.map(g => (
                <div
                  key={g.id}
                  className="border p-2 rounded cursor-move bg-white"
                >
                  {g.name}
                </div>
              ))}
            </div>
          </div>

          {/* Plano interactivo */}
          <div
            className="relative flex-1 border rounded p-4"
            style={{ height: '500px' }}
          >
            {tables.map(table => (
              <div
                key={table.id}
                className={`absolute p-2 flex flex-col items-center justify-center ${table.shape === 'circle' ? 'rounded-full' : 'rounded'} bg-gray-200`}
                style={{ left: table.x, top: table.y, width: 80, height: 80 }}
              >
                <p className="text-sm font-semibold">{table.name}</p>
                <p className="text-xs">{table.capacity} pax</p>
              </div>
            ))}
          </div>
        </div>
      </DndProvider>

      {/* IA y acciones */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Criterios de IA"
          value={aiPrompt}
          onChange={e => setAiPrompt(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
        <button className="bg-purple-600 text-white px-4 py-1 rounded flex items-center">
          <Cpu size={16} className="mr-2" />Autoasignar
        </button>
        <button className="bg-gray-200 px-4 py-1 rounded">Exportar PDF</button>
      </div>
    </div>
  );
}

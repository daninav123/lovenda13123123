import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Music, Download } from 'lucide-react';

export default function MomentosEspeciales() {
  const blocks = [
    { name: 'Ceremonia', items: ['Entrada novios', 'Lectura de votos', 'Anillos'] },
    { name: 'Cocktail', items: ['Aperitivos', 'Brindis'] },
    { name: 'Banquete', items: ['Primer plato', 'Segundo plato', 'Postre'] },
    { name: 'Disco', items: ['Baile', 'DJ set'] },
  ];
  const [openBlock, setOpenBlock] = useState(null);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Momentos Especiales</h2>
      {blocks.map(block => (
        <div key={block.name} className="border rounded">
          <button
            onClick={() => setOpenBlock(openBlock === block.name ? null : block.name)}
            className="w-full flex justify-between p-4 bg-gray-100"
          >
            <span>{block.name}</span>
            {openBlock === block.name ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openBlock === block.name && (
            <ul className="p-4 space-y-2">
              {block.items.map(item => (
                <li key={item} className="flex justify-between">
                  {item}
                  <Music size={16} className="text-blue-600" />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center">
        <Download size={16} className="mr-2" /> Exportar Playlist
      </button>
    </div>
  );
}

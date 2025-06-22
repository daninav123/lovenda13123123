import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const MomentosEspeciales = () => {
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [newMoment, setNewMoment] = useState({ title: '', description: '', block: '' });
  
  // Datos de ejemplo
  const [blocks, setBlocks] = useState([
    {
      id: 'ceremonia',
      name: 'Ceremonia',
      moments: [
        { id: 1, title: 'Entrada de los novios', description: 'Descripción de la entrada...', duration: '5 min' },
        { id: 2, title: 'Lecturas', description: 'Lecturas seleccionadas...', duration: '10 min' },
      ],
    },
    {
      id: 'coctel',
      name: 'Cóctel',
      moments: [
        { id: 3, title: 'Brindis de bienvenida', description: 'Palabras de bienvenida...', duration: '15 min' },
      ],
    },
    {
      id: 'banquete',
      name: 'Banquete',
      moments: [],
    },
    {
      id: 'disco',
      name: 'Disco',
      moments: [
        { id: 4, title: 'Primer baile', description: 'Canción: Perfect - Ed Sheeran', duration: '4 min' },
      ],
    },
  ]);

  const toggleBlock = (blockId) => {
    setExpandedBlock(expandedBlock === blockId ? null : blockId);
  };

  const handleAddMoment = (blockId) => {
    if (newMoment.title && newMoment.block === blockId) {
      const updatedBlocks = blocks.map(block => {
        if (block.id === blockId) {
          return {
            ...block,
            moments: [...block.moments, { 
              id: Date.now(), 
              title: newMoment.title,
              description: newMoment.description || 'Sin descripción',
              duration: '5 min'
            }]
          };
        }
        return block;
      });
      setBlocks(updatedBlocks);
      setNewMoment({ title: '', description: '', block: '' });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Momentos Especiales</h2>
      <p className="text-gray-600">Organiza los momentos clave de tu boda por bloques.</p>
      
      <div className="space-y-4">
        {blocks.map((block) => (
          <Card key={block.id} className="overflow-hidden">
            <button
              onClick={() => toggleBlock(block.id)}
              className="w-full px-4 py-3 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
            >
              <span>{block.name} <span className="text-sm text-gray-500 ml-2">({block.moments.length})</span></span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  expandedBlock === block.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedBlock === block.id && (
              <div className="p-4 space-y-4">
                <div className="space-y-4">
                  {block.moments.map((moment) => (
                    <div key={moment.id} className="p-3 bg-white border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{moment.title}</h3>
                          <p className="text-sm text-gray-600">{moment.description}</p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {moment.duration}
                          </span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Añadir nuevo momento</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Título del momento"
                      className="w-full p-2 border rounded"
                      value={newMoment.block === block.id ? newMoment.title : ''}
                      onChange={(e) => setNewMoment({
                        ...newMoment,
                        title: e.target.value,
                        block: block.id
                      })}
                    />
                    <textarea
                      placeholder="Descripción (opcional)"
                      rows="2"
                      className="w-full p-2 border rounded"
                      value={newMoment.block === block.id ? newMoment.description : ''}
                      onChange={(e) => setNewMoment({
                        ...newMoment,
                        description: e.target.value,
                        block: block.id
                      })}
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleAddMoment(block.id)}
                        disabled={!newMoment.title || newMoment.block !== block.id}
                        className="px-4 py-2 text-sm"
                      >
                        Añadir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MomentosEspeciales;

import React, { useState, useEffect } from 'react';
import { Edit2, AlertCircle } from 'lucide-react';

// Estado de ejemplo
const sampleTimeline = [
  {
    name: 'Ceremonia',
    duration: 30,
    items: [
      { id: 1, name: 'Entrada novios', time: '14:00', status: 'on-time' },
      { id: 2, name: 'Votos', time: '14:10', status: 'on-time' },
    ],
  },
  {
    name: 'Cocktail',
    duration: 45,
    items: [
      { id: 3, name: 'Aperitivos', time: '14:45', status: 'ahead' },
    ],
  },
];

function getStatusColor(status) {
  switch (status) {
    case 'on-time': return 'bg-green-500';
    case 'ahead': return 'bg-blue-500';
    case 'late': return 'bg-red-500';
    default: return 'bg-gray-300';
  }
}

export default function Timing() {
  const [timeline, setTimeline] = useState(sampleTimeline);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Timing</h2>
      <div className="relative">
        {timeline.map(block => (
          <div key={block.name} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{block.name} ({block.duration} min)</span>
              <Edit2 className="cursor-pointer text-gray-600" />
            </div>
            <div className="border-l-2 border-gray-200 pl-4 space-y-2">
              {block.items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-sm">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Marcador de tiempo actual */}
        <div className="absolute left-0 transform -translate-x-2 w-4 h-4 rounded-full bg-yellow-400" style={{ top: '100px' }} />
      </div>
    </div>
  );
}

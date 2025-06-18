import React, { useState } from 'react';
import { Plus, Edit2, Download, Filter } from 'lucide-react';

export default function Checklist() {
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [responsibleFilter, setResponsibleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [selected, setSelected] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);

  const blocks = [
    {
      name: 'Día Previo a la Boda',
      tasks: [
        { id: 1, title: 'Ensayo general', type: 'ensayo', responsible: 'Equipo', due: '2025-06-17', status: 'Pendiente' }
      ]
    },
    {
      name: 'Antes de empezar la boda',
      tasks: [
        { id: 2, title: 'Alinear decoraciones', type: 'montaje', responsible: 'Rollout', due: '2025-06-18', status: 'En progreso' }
      ]
    }
  ];

  const toggleSelect = id => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Checklist de Protocolo</h2>
      <p className="text-sm text-gray-600">Más / Protocolo / Checklist</p>

      {/* Controles */}
      <div className="flex flex-wrap gap-2 items-center">
        <input type="text" placeholder="Buscar tarea" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-2 py-1" />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Tipo</option>
          <option value="ensayo">Ensayo</option>
          <option value="montaje">Montaje</option>
          <option value="audio/vídeo">Audio/Vídeo</option>
        </select>
        <select value={responsibleFilter} onChange={e => setResponsibleFilter(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Responsable</option>
          <option value="Equipo">Equipo</option>
          <option value="Rollout">Rollout</option>
        </select>
        <input type="date" value={dateFilter.from} onChange={e => setDateFilter(prev => ({...prev, from: e.target.value}))} className="border rounded px-2 py-1" />
        <input type="date" value={dateFilter.to} onChange={e => setDateFilter(prev => ({...prev, to: e.target.value}))} className="border rounded px-2 py-1" />
        <button onClick={() => setView(view === 'list' ? 'cards' : 'list')} className="bg-gray-200 px-2 py-1 rounded">
          {view === 'list' ? 'Ver Tarjetas' : 'Ver Lista'}
        </button>
        <button onClick={() => setShowNewModal(true)} className="bg-blue-600 text-white px-3 py-1 rounded flex items-center">
          <Plus size={16} className="mr-1" /> Nueva Tarea
        </button>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="bg-gray-100 p-2 rounded flex gap-2">
          <button className="bg-green-600 text-white px-2 py-1 rounded">Cambiar estado ({selected.length})</button>
          <button className="bg-purple-600 text-white px-2 py-1 rounded flex items-center">
            <Download size={16} className="mr-1" /> Exportar CSV
          </button>
        </div>
      )}

      {/* Vista Lista */}
      {view === 'list' && (
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th><input type="checkbox" /></th>
              <th>Tarea</th>
              <th>Tipo</th>
              <th>Responsable</th>
              <th>Fecha límite</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {blocks.flatMap(block =>
              block.tasks.map(t => (
                <tr key={t.id}>
                  <td><input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggleSelect(t.id)} /></td>
                  <td>{t.title}</td>
                  <td>{t.type}</td>
                  <td>{t.responsible}</td>
                  <td>{t.due}</td>
                  <td className="cursor-pointer" onClick={() => {}}>{t.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Vista Tarjetas */}
      {view === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blocks.flatMap(block =>
            block.tasks.map(t => (
              <div key={t.id} className="border p-4 rounded shadow">
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-gray-600">{t.responsible} - {t.due}</p>
                <button className="mt-2 text-gray-600">Drag</button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal Nueva Tarea */}
      {showNewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow w-80">
            <h3 className="font-semibold mb-2">Nueva Tarea</h3>
            {/* TODO: formulario */}
            <button onClick={() => setShowNewModal(false)} className="mt-2 px-2 py-1 bg-red-600 text-white rounded">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

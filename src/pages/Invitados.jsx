import React, { useState } from 'react';
import { Search, Mail, Edit2, Trash2, RefreshCcw, Plus, User } from 'lucide-react';

export default function Invitados() {
  const sampleGuests = [
    { id: 1, name: 'Ana García', email: 'ana@example.com', phone: '123456789', rsvp: 'Sí', guests: 1, table: 5 },
    { id: 2, name: 'Luis Martínez', email: 'luis@example.com', phone: '987654321', rsvp: 'Pendiente', guests: 2, table: '' },
  ];
  const [guests, setGuests] = useState(sampleGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [rsvpFilter, setRsvpFilter] = useState('');
  const [tableFilter, setTableFilter] = useState('');
  const [selected, setSelected] = useState([]);
const statuses = ['Pendiente', 'Sí', 'No'];
const getNextStatus = curr => {
  const idx = statuses.indexOf(curr);
  return statuses[(idx + 1) % statuses.length];
};
const sendBulkEmails = () => {
  const recipients = selected
    .map(id => guests.find(g => g.id === id)?.email)
    .filter(Boolean)
    .join(',');
  if (recipients) {
    window.open('mailto:' + recipients + '?subject=Recordatorio boda&body=¡Hola! Te esperamos en nuestra boda.');
  }
};
  const [showModal, setShowModal] = useState(false);

  const filtered = guests.filter(g => {
    return (
      (g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (rsvpFilter ? g.rsvp === rsvpFilter : true) &&
      (tableFilter ? String(g.table) === tableFilter : true)
    );
  });

  const toggleSelect = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestión de Invitados</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <Plus size={16} className="mr-2" />Añadir Invitado
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center border rounded px-2 py-1">
          <Search size={16} className="mr-2 text-gray-600" />
          <input
            type="text"
            placeholder="Buscar por nombre o email"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="outline-none"
          />
        </div>
        <select value={rsvpFilter} onChange={e => setRsvpFilter(e.target.value)} className="border rounded px-2 py-1">
          <option value="">RSVP Todos</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
          <option value="Pendiente">Pendiente</option>
        </select>
        <input
          type="number"
          placeholder="Mesa"
          value={tableFilter}
          onChange={e => setTableFilter(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button className="bg-gray-200 px-3 py-1 rounded flex items-center">
          <RefreshCcw size={16} className="mr-1" />Limpiar
        </button>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="bg-gray-100 p-2 rounded flex gap-2">
          <button onClick={sendBulkEmails} className="bg-green-600 text-white px-3 py-1 rounded">Enviar recordatorio ({selected.length})</button>
          <select className="border rounded px-2 py-1">
            <option>Asignar mesa</option>
            {[...new Set(filtered.map(g => g.table))].map(table => (
              <option key={table} value={table}>
                Mesa {table}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tabla Escritorio */}
      <div className="hidden md:block overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2"><input type="checkbox" /></th>
              <th className="p-2">Nombre completo</th>
              <th className="p-2">Email</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Estado RSVP</th>
              <th className="p-2">Nº acompañantes</th>
              <th className="p-2">Mesa</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(g => (
              <tr key={g.id} className="border-b">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(g.id)}
                    onChange={() => toggleSelect(g.id)}
                  />
                </td>
                <td className="p-2 flex items-center">
                  <User size={20} className="mr-2 text-gray-600" />
                  {g.name}
                </td>
                <td className="p-2">{g.email}</td>
                <td className="p-2">{g.phone}</td>
                <td className="p-2 cursor-pointer" onClick={() => setGuests(prev => prev.map(x => x.id === g.id ? { ...x, rsvp: getNextStatus(x.rsvp) } : x))}>{g.rsvp}</td>
                <td className="p-2 cursor-pointer">{g.guests}</td>
                <td className="p-2">{g.table || '-'}</td>
                <td className="p-2 flex gap-2">
                  <Edit2 size={16} className="cursor-pointer text-blue-600" />
                  <Trash2 size={16} className="cursor-pointer text-red-600" />
                  <Mail size={16} className="cursor-pointer text-green-600" onClick={() => window.open('mailto:' + g.email + '?subject=Recordatorio boda&body=¡Hola ' + g.name + ', te esperamos en nuestra boda!')} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Vista móvil */}
      <div className="block md:hidden space-y-4">
        {filtered.map(g => (
          <div key={g.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <User size={20} className="mr-2 text-gray-600" />
                <div>
                  <p className="font-semibold">{g.name}</p>
                  <p className="text-sm text-gray-600">{g.email}</p>
                </div>
              </div>
              <button onClick={() => toggleSelect(g.id)} className="text-gray-600">Acciones</button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow w-96">
            <h2 className="text-lg font-semibold mb-4">Añadir Invitado</h2>
            {/* Campos de formulario */}
            <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

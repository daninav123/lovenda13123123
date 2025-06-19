import React, { useState } from 'react';
import { Search, RefreshCcw, Plus, Eye, Edit2, Trash2, Calendar, Download, Cpu, Star } from 'lucide-react';

export default function Proveedores() {
  const sampleProviders = [
    { id: 1, name: 'Eventos Catering', service: 'Catering', contact: 'Luis Pérez', email: 'luis@catering.com', phone: '555-1234', status: 'Contactado', date: '2025-06-10', rating: 0, ratingCount: 0 },
    { id: 2, name: 'Flores y Diseño', service: 'Flores', contact: 'Ana Gómez', email: 'ana@flores.com', phone: '555-5678', status: 'Confirmado', date: '2025-06-12', rating: 0, ratingCount: 0 },
  ];
  const [providers, setProviders] = useState(sampleProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailProvider, setDetailProvider] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [showResModal, setShowResModal] = useState(false);
  const [providerToReserve, setProviderToReserve] = useState(null);
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');

  const openResModal = (p) => {
    setProviderToReserve(p);
    setResDate('');
    setResTime('');
    setShowResModal(true);
  };

  const confirmReservation = () => {
    if (providerToReserve && resDate && resTime) {
      const dt = new Date(resDate + 'T' + resTime);
      setReservations(prev => [...prev, { providerId: providerToReserve.id, datetime: dt }]);
      setShowResModal(false);
    }
  };

  const rateProvider = (id, ratingValue) => {
    setProviders(prev => prev.map(p =>
      p.id === id ? { ...p,
        ratingCount: p.ratingCount + 1,
        rating: (p.rating * p.ratingCount + ratingValue) / (p.ratingCount + 1)
      } : p
    ));
  };

  const filtered = providers.filter(p =>
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.service.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (serviceFilter ? p.service === serviceFilter : true) &&
    (statusFilter ? p.status === statusFilter : true) &&
    (dateFrom ? p.date >= dateFrom : true) &&
    (dateTo ? p.date <= dateTo : true)
  );

  const toggleSelect = id => {
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const clearFilters = () => {
    setSearchTerm(''); setAiQuery(''); setServiceFilter(''); setStatusFilter(''); setDateFrom(''); setDateTo('');
  };

  const handleAiSearch = () => {
    // TODO: integrar IA para búsquedas avanzadas
    console.log('Query IA:', aiQuery);
  };

  const openDetail = p => { setDetailProvider(p); setShowDetail(true); };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestión de Proveedores</h1>
        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <Plus size={16} className="mr-2" /> Añadir Proveedor
        </button>
          <button className="bg-gray-200 px-4 py-2 rounded flex items-center">
            <RefreshCcw size={16} className="mr-2" /> Importar CSV
          </button>
        </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center border rounded px-2 py-1">
          <Search size={16} className="mr-2 text-gray-600" />
          <input
            type="text"
            placeholder="Buscar nombre o servicio"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="outline-none"
          />
        </div>
        <div className="flex items-center border rounded px-2 py-1">
          <Cpu size={16} className="mr-2 text-gray-600" />
          <input
            type="text"
            placeholder="Buscar IA..."
            value={aiQuery}
            onChange={e => setAiQuery(e.target.value)}
            className="outline-none"
          />
        </div>
        <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Todos los servicios</option>
          <option value="Catering">Catering</option>
          <option value="Flores">Flores</option>
          <option value="Música">Música</option>
          <option value="Fotografía">Fotografía</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Todos los estados</option>
          <option value="Contactado">Contactado</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Pendiente">Pendiente</option>
        </select>
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="border rounded px-2 py-1" />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="border rounded px-2 py-1" />
        <button onClick={clearFilters} className="bg-gray-200 px-3 py-1 rounded flex items-center">
          <RefreshCcw size={16} className="mr-1" /> Limpiar
        </button>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="bg-gray-100 p-2 rounded flex gap-2">
          <button className="bg-green-600 text-white px-3 py-1 rounded">Enviar comunicaciones ({selected.length})</button>
          <select className="border rounded px-2 py-1">
            <option value="">Cambiar estado...</option>
            <option value="Contactado">Contactado</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
      )}

      {/* Tabla Escritorio */}
      <div className="hidden md:block overflow-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2"><input type="checkbox" /></th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Servicio</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Email</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Valoración</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-2">
                  <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} />
                </td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.service}</td>
                <td className="p-2">{p.contact}</td>
                <td className="p-2">{p.email}</td>
                <td className="p-2">{p.phone}</td>
                <td className="p-2 cursor-pointer">{p.status}</td>
                <td className="p-2 cursor-pointer">{p.date}</td>
                <td className="p-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className="cursor-pointer" color={i <= Math.round(p.rating) ? '#facc15' : '#e5e7eb'} onClick={() => rateProvider(p.id, i)} />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({p.ratingCount})</span>
                </td>
                <td className="p-2 flex gap-2">
                  <Eye size={16} className="cursor-pointer text-gray-600" />
                  <Edit2 size={16} className="cursor-pointer text-blue-600" />
                  <Trash2 size={16} className="cursor-pointer text-red-600" />
                  <Calendar size={16} className="cursor-pointer text-green-600" onClick={() => openResModal(p)} />
                  <span className="text-sm text-gray-600 ml-1">{reservations.filter(r => r.providerId === p.id).length}</span>
                  <Download size={16} className="cursor-pointer text-purple-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="block md:hidden space-y-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold text-lg">{p.name}</p>
                <p className="text-sm text-gray-600">{p.service} - {p.status}</p>
                <p className="text-sm text-gray-600">{p.contact}</p>
              </div>
              <button onClick={() => toggleSelect(p.id)} className="text-gray-600">Acciones</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Añadir Proveedor */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow w-96">
            <h2 className="text-lg font-semibold mb-4">Añadir Proveedor</h2>
            {/* TODO: Formulario de alta */}
            <button onClick={() => setShowAddModal(false)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}


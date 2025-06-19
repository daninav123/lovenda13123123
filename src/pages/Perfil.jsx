import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';

export default function Perfil() {
  const { userName, email, weddingName, logoUrl, partnerName, partnerEmail, updateProfile } = useUserContext();
  const [form, setForm] = useState({ userName: '', email: '', weddingName: '', logoUrl: '', partnerName: '', partnerEmail: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    setForm({ userName, email, weddingName, logoUrl, partnerName, partnerEmail });
  }, [userName, email, weddingName, logoUrl, partnerName, partnerEmail]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ userName: form.userName, email: form.email, weddingName: form.weddingName, logoUrl: form.logoUrl, partnerName: form.partnerName, partnerEmail: form.partnerEmail });
    setStatus('Perfil actualizado correctamente');
    setTimeout(() => setStatus(''), 3000);
  };

  const handleCancel = () => {
    setForm({ userName, email, weddingName, logoUrl, partnerName, partnerEmail });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Editar Perfil</h1>
      {status && <p className="text-green-600 mb-2">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            name="userName"
            value={form.userName}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nombre de la Boda</label>
          <input
            name="weddingName"
            value={form.weddingName}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">URL de la foto</label>
          <input
            name="logoUrl"
            value={form.logoUrl || ''}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nombre de la pareja</label>
          <input
            name="partnerName"
            value={form.partnerName}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email de la pareja</label>
          <input
            name="partnerEmail"
            type="email"
            value={form.partnerEmail}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
          <button type="button" onClick={() => window.location.href = `mailto:${form.partnerEmail}?subject=Invitación a tu pareja`} disabled={!form.partnerEmail} className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50">
            Enviar Invitación
          </button>
        </div>
      </form>
    </div>
  );
}

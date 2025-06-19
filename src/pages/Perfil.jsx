import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { LogOut } from 'lucide-react';

export default function Perfil() {
  const { userName, logoUrl, logout } = useUserContext();
  const nameParts = userName.split(' ');
  const [firstName, setFirstName] = useState(nameParts[0] || '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [preferences, setPreferences] = useState({ notifications: true, darkMode: false });
  const [partner, setPartner] = useState('');
  const [linkedPartner, setLinkedPartner] = useState('');
  const [helper, setHelper] = useState('');
  const [helpers, setHelpers] = useState([]);
  const [planner, setPlanner] = useState('');
  const [linkedPlanner, setLinkedPlanner] = useState('');

  const handleLinkPartner = () => {
    setLinkedPartner(partner);
    setPartner('');
  };
  const handleAddHelper = () => {
    if (helper) setHelpers([...helpers, helper]);
    setHelper('');
  };
  const handleLinkPlanner = () => {
    setLinkedPlanner(planner);
    setPlanner('');
  };
  const handleSave = e => {
    e.preventDefault();
    // TODO: implementar guardado via API
    alert('Perfil guardado');
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <div className="flex items-center gap-4">
        <img src={logoUrl || 'https://via.placeholder.com/80'} alt="Avatar" className="w-20 h-20 rounded-full border" />
        <label className="cursor-pointer bg-gray-200 p-2 rounded">
          Cambiar avatar
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Nombre" className="border rounded px-2 py-1 w-full" />
          <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Apellidos" className="border rounded px-2 py-1 w-full" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border rounded px-2 py-1 w-full sm:col-span-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Contraseña actual" className="border rounded px-2 py-1 w-full" />
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nueva contraseña" className="border rounded px-2 py-1 w-full" />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={preferences.notifications} onChange={e => setPreferences({...preferences, notifications: e.target.checked})} />
            Recibir notificaciones
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={preferences.darkMode} onChange={e => setPreferences({...preferences, darkMode: e.target.checked})} />
            Modo oscuro
          </label>
        </div>
        <div className="space-y-6">
          <div>
            <p className="font-semibold">Pareja:</p>
            {linkedPartner ? <p>{linkedPartner}</p> : <p className="text-gray-500">No vinculada</p>}
            <div className="flex gap-2 mt-2">
              <input value={partner} onChange={e => setPartner(e.target.value)} placeholder="Nombre de pareja" className="border rounded px-2 py-1 flex-1" />
              <button type="button" onClick={handleLinkPartner} className="bg-blue-600 text-white px-3 py-1 rounded">Vincular</button>
            </div>
          </div>
          <div>
            <p className="font-semibold">Ayudantes:</p>
            <ul className="list-disc list-inside">
              {helpers.map((h,i) => <li key={i}>{h}</li>)}
            </ul>
            <div className="flex gap-2 mt-2">
              <input value={helper} onChange={e => setHelper(e.target.value)} placeholder="Agregar ayudante" className="border rounded px-2 py-1 flex-1" />
              <button type="button" onClick={handleAddHelper} className="bg-blue-600 text-white px-3 py-1 rounded">Agregar</button>
            </div>
          </div>
          <div>
            <p className="font-semibold">Wedding Planner:</p>
            {linkedPlanner ? <p>{linkedPlanner}</p> : <p className="text-gray-500">No vinculado</p>}
            <div className="flex gap-2 mt-2">
              <input value={planner} onChange={e => setPlanner(e.target.value)} placeholder="Nombre del planner" className="border rounded px-2 py-1 flex-1" />
              <button type="button" onClick={handleLinkPlanner} className="bg-blue-600 text-white px-3 py-1 rounded">Vincular</button>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button type="button" onClick={logout} className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded">
            <LogOut size={16} /> Logout
          </button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar cambios</button>
        </div>
      </form>
    </div>
  );
}

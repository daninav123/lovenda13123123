import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { Plus, Trash2 } from 'lucide-react';

const initialState = () => {
  try {
    const saved = localStorage.getItem('menuDesigner');
    return saved ? JSON.parse(saved) : { entradas: [], principales: [], postres: [], bebidas: [] };
  } catch {
    return { entradas: [], principales: [], postres: [], bebidas: [] };
  }
};

export default function MenuDiseno() {
  const [menu, setMenu] = useState(initialState);
  const [course, setCourse] = useState('entradas');
  const [dish, setDish] = useState('');

  useEffect(() => {
    localStorage.setItem('menuDesigner', JSON.stringify(menu));
  }, [menu]);

  const addDish = () => {
    if (!dish.trim()) return;
    setMenu(prev => ({ ...prev, [course]: [...prev[course], dish.trim()] }));
    setDish('');
  };

  const removeDish = (courseKey, idx) => {
    setMenu(prev => ({
      ...prev,
      [courseKey]: prev[courseKey].filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Diseño del Menú</h1>
        <div className="flex flex-col md:flex-row gap-2 md:items-end">
          <select value={course} onChange={e => setCourse(e.target.value)} className="border rounded px-3 py-2">
            <option value="entradas">Entradas</option>
            <option value="principales">Plato principal</option>
            <option value="postres">Postres</option>
            <option value="bebidas">Bebidas</option>
          </select>
          <input
            type="text"
            placeholder="Nombre del plato"
            value={dish}
            onChange={e => setDish(e.target.value)}
            className="flex-grow border rounded px-3 py-2"
          />
          <button onClick={addDish} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded">
            <Plus size={16} /> Añadir
          </button>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Vista Previa</h2>
        <div className="space-y-4 text-center font-serif">
          {Object.entries(menu).map(([key, dishes]) => (
            <div key={key} className="space-y-1">
              <h3 className="text-lg font-bold capitalize">{key}</h3>
              {dishes.length === 0 && <p className="text-sm text-gray-500">Sin elementos</p>}
              {dishes.map((d, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 group">
                  <span>{d}</span>
                  <button
                    onClick={() => removeDish(key, idx)}
                    className="hidden group-hover:inline-flex text-red-600"
                    aria-label={`Eliminar ${d}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

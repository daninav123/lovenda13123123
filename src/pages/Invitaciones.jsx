import React, { useState } from 'react';
import { Search, Eye, Download, Save, Copy, Zap } from 'lucide-react';

export default function Invitaciones() {
  const [aiPrompt, setAiPrompt] = useState('');
  const handleAiGenerate = () => {
    // TODO: llamar a la IA para generar invitación
    console.log('IA Prompt:', aiPrompt);
  };  
  const [panel, setPanel] = useState('invitation'); // 'invitation' o 'envelope'
  const [filterCategory, setFilterCategory] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterFont, setFilterFont] = useState('');

  // Ejemplo de plantillas
  const templates = [
    { id: 1, name: 'Clásico', category: 'clásico', color: 'pastel', font: 'Serif' },
    { id: 2, name: 'Moderno', category: 'moderno', color: 'vibrante', font: 'Sans' },
    { id: 3, name: 'Rústico', category: 'rústico', color: 'tierra', font: 'Handwriting' },
    { id: 4, name: 'Minimalista', category: 'minimalista', color: 'monocromo', font: 'Sans' },
  ];
  const filtered = templates.filter(t =>
    (filterCategory ? t.category === filterCategory : true) &&
    (filterColor ? t.color === filterColor : true) &&
    (filterFont ? t.font === filterFont : true)
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Diseño de Invitaciones</h1>

      {/* Asistente de IA */}
      <section className="border rounded p-4 space-y-4">
        <h2 className="text-lg font-semibold">Asistente de IA</h2>
        <textarea
          rows={3}
          placeholder="Describe cómo quieres tu invitación..."
          value={aiPrompt}
          onChange={e => setAiPrompt(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          onClick={handleAiGenerate}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center"
        >
          <Zap size={16} className="mr-2" /> Generar invitación
        </button>
      </section>

      {/* Selección de Plantilla */}
      <section className="border rounded p-4 space-y-4">
        <h2 className="text-lg font-semibold">Selección de Plantilla</h2>
        <div className="flex gap-4 flex-wrap">
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Todos los estilos</option>
            <option value="clásico">Clásico</option>
            <option value="moderno">Moderno</option>
            <option value="rústico">Rústico</option>
            <option value="minimalista">Minimalista</option>
          </select>
          <select value={filterColor} onChange={e => setFilterColor(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Todas las paletas</option>
            <option value="pastel">Pastel</option>
            <option value="vibrante">Vibrante</option>
            <option value="tierra">Tierra</option>
            <option value="monocromo">Monocromo</option>
          </select>
          <select value={filterFont} onChange={e => setFilterFont(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Todas las tipografías</option>
            <option value="Serif">Serif</option>
            <option value="Sans">Sans</option>
            <option value="Handwriting">Handwriting</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {filtered.map(t => (
            <div key={t.id} className="border rounded overflow-hidden cursor-pointer hover:shadow-lg">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editor Invitación/Sobre */}
      <section className="border rounded p-4 space-y-4">
        <div className="flex gap-4">
          <button onClick={() => setPanel('invitation')} className={`px-4 py-2 rounded ${panel==='invitation'?'bg-blue-600 text-white':'bg-gray-200'}`}>Invitación</button>
          <button onClick={() => setPanel('envelope')} className={`px-4 py-2 rounded ${panel==='envelope'?'bg-blue-600 text-white':'bg-gray-200'}`}>Sobre</button>
        </div>
        <div className="border bg-white h-[400px] flex items-center justify-center text-gray-400">
          {panel === 'invitation'
            ? 'Canvas de invitación: arrastra componentes aquí'
            : 'Canvas de sobre: frontal / trasero'}
        </div>
      </section>

      {/* Preview y Exportación */}
      <section className="flex flex-wrap gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <Eye size={16} className="mr-2" />Previsualizar
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center">
          <Download size={16} className="mr-2" />Exportar PDF
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center">
          <Download size={16} className="mr-2" />Exportar PNG
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Compartir
        </button>
      </section>

      {/* Opciones Avanzadas */}
      <section className="border rounded p-4">
        <h2 className="text-lg font-semibold">Opciones Avanzadas</h2>
        <div className="flex gap-2 mt-2">
          <button className="bg-gray-200 px-3 py-1 rounded flex items-center">
            <Save size={16} className="mr-2" />Guardar Borrador
          </button>
          <button className="bg-gray-200 px-3 py-1 rounded flex items-center">
            <Copy size={16} className="mr-2" />Duplicar Diseño
          </button>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';

export default function Ideas() {
  const [view, setView] = useState('notes');
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [voices, setVoices] = useState([]);
  const [photos, setPhotos] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Ideas</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setView('notes')} className={`px-4 py-2 rounded ${view==='notes'?'bg-blue-600 text-white':''}`}>Notas</button>
        <button onClick={() => setView('voices')} className={`px-4 py-2 rounded ${view==='voices'?'bg-blue-600 text-white':''}`}>Notas de Voz</button>
        <button onClick={() => setView('photos')} className={`px-4 py-2 rounded ${view==='photos'?'bg-blue-600 text-white':''}`}>Fotos</button>
      </div>
      {view==='notes' && (
        <div>
          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            className="w-full border rounded p-2 mb-2"
            placeholder="Escribe tu nota..."
          />
          <button
            onClick={() => {
              if (noteText) {
                setNotes(prev => [...prev, noteText]);
                setNoteText('');
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Añadir Nota
          </button>
          <ul className="mt-4 list-disc list-inside">
            {notes.map((n,i) => (<li key={i}>{n}</li>))}
          </ul>
        </div>
      )}
      {view==='voices' && (
        <div>
          <input
            type="file"
            accept="audio/*"
            onChange={e => {
              const file = e.target.files[0];
              if (file) setVoices(prev => [...prev, URL.createObjectURL(file)]);
            }}
          />
          <ul className="mt-4 space-y-2">
            {voices.map((v,i) => (<li key={i}><audio controls src={v} /></li>))}
          </ul>
        </div>
      )}
      {view==='photos' && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files[0];
              if (file) setPhotos(prev => [...prev, URL.createObjectURL(file)]);
            }}
          />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {photos.map((p,i) => (<img key={i} src={p} alt={`Foto ${i}`} className="w-full h-32 object-cover rounded" />))}
          </div>
        </div>
      )}
    </div>
  );
}

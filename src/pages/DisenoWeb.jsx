import React, { useState } from 'react';

export default function DisenoWeb() {
  const [prompt, setPrompt] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);

  const generateWeb = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    // TODO: Integrar llamada a IA que genere HTML a partir del prompt.
    const generated = `<html><head><style>body{font-family:sans-serif;padding:2rem}</style></head><body><h1>${prompt}</h1><p>Ejemplo de web generada.</p></body></html>`;
    setHtml(generated);
    setLoading(false);
  };

  const publishWeb = () => {
    // TODO: lógica de publicación
    alert('Página publicada (demo)');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Diseño Web</h1>

      <textarea
        className="w-full h-40 border rounded p-3"
        placeholder="Describe cómo quieres que sea tu página web..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateWeb}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Generando...' : 'Generar'}
      </button>

      {html && (
        <>
          <div className="border rounded overflow-hidden">
            <iframe
              title="Vista previa"
              srcDoc={html}
              sandbox="allow-same-origin allow-scripts"
              className="w-full h-[600px] border-none"
            />
          </div>

          <button
            onClick={publishWeb}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Publicar página
          </button>
        </>
      )}
    </div>
  );
}

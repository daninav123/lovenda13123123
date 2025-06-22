import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useUserContext } from '../context/UserContext';

export default function DisenoWeb() {
  const templates = ['Clásico', 'Moderno', 'Minimalista'];
  const [selected, setSelected] = useState(() => localStorage.getItem('selectedTemplate') || null);
  const { userName, partnerName, weddingDate, venue, themeColor } = useUserContext();

  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (selected) localStorage.setItem('selectedTemplate', selected);
    else localStorage.removeItem('selectedTemplate');
  }, [selected]);
  const getHtml = () => `<!DOCTYPE html><html lang=\"es\"><head><meta charset=\"UTF-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/><title>Save the Date</title><style>body{font-family:sans-serif;text-align:center;padding:2rem;color:${themeColor}}header{background-color:${themeColor};color:#fff;padding:1rem}section{margin:2rem 0}</style></head><body><header><h1>Save the Date</h1><h2>${userName} & ${partnerName}</h2><p>Plantilla: ${selected}</p></header><section><p>Nos casamos el ${weddingDate} en ${venue}.</p></section><footer><p>¡Te esperamos!</p></footer></body></html>`;
  const generateZip = async () => {
    const html = getHtml();
    const zip = new JSZip();
    zip.file('index.html', html);
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'wedding_site.zip');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Diseño Web</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((tpl, idx) => (
          <div
            key={idx}
            className={`p-4 border rounded-lg cursor-pointer ${
              selected === tpl ? 'border-blue-600 bg-blue-50' : ''
            }`}
            onClick={() => setSelected(tpl)}
          >
            <p className="text-lg font-medium">{tpl}</p>
          </div>
        ))}
      </div>
      {selected && (
        <>
          <div className="mt-6 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{userName} & {partnerName}</h2>
            <p>Nos casamos el {weddingDate} en {venue}.</p>
          </div>
                      <div className="flex space-x-2 mt-4">
            <button onClick={generateZip} className="bg-blue-600 text-white px-4 py-2 rounded">Descargar Sitio</button>
            <button onClick={() => setPreviewOpen(true)} className="bg-gray-600 text-white px-4 py-2 rounded">Vista Previa</button>
          </div>
        </>
      )}
      {previewOpen && (
        <div className="mt-4">
          
          <iframe srcDoc={getHtml()} sandbox="allow-same-origin" className="w-full h-96 border" />
        </div>
      )}
    </div>
  );
}

import React from 'react';

export default function SeatingToolbar({
  tab,
  addTable,
  setScale,
  undo,
  redo,
  exportPNG,
  exportPDF,
  generateSeatGrid,
  setTemplateOpen,
  setBanquetConfigOpen,
  handleLocalAssign,
  handleServerAssign,
  loadingAI,
  setOffset
}) {
  return (
    <div className="mt-3 flex space-x-2 flex-wrap md:flex-nowrap overflow-x-auto pb-2">
      <button aria-label onClick={addTable} className="px-3 py-1 text-sm bg-amber-300 rounded">Añadir mesa</button>
      <button aria-label onClick={() => setScale(s => Math.min(4, s * 1.2))} className="px-3 py-1 text-sm bg-gray-200 rounded">➕</button>
      <button aria-label onClick={() => setScale(s => Math.max(0.5, s / 1.2))} className="px-3 py-1 text-sm bg-gray-200 rounded">➖</button>
      <button aria-label onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }); }} className="px-3 py-1 text-sm bg-gray-200 rounded">Reset</button>
      <button aria-label onClick={undo} className="px-3 py-1 text-sm bg-gray-200 rounded">Undo</button>
      <button aria-label onClick={redo} className="px-3 py-1 text-sm bg-gray-200 rounded">Redo</button>
      <button aria-label onClick={exportPNG} className="px-3 py-1 text-sm bg-gray-200 rounded">Export PNG</button>
      <button aria-label onClick={exportPDF} className="px-3 py-1 text-sm bg-gray-200 rounded">Export PDF</button>
      <button aria-label onClick={() => setTemplateOpen(true)} className="px-3 py-1 text-sm bg-gray-200 rounded">Plantillas</button>
      {tab === 'banquet' && (
        <button aria-label onClick={() => setBanquetConfigOpen(true)} className="px-3 py-1 text-sm bg-gray-200 rounded">Auto-layout banquete</button>
      )}
      {tab === 'ceremony' && (
        <button aria-label onClick={() => generateSeatGrid(10, 12, 40, 100, 80, 6, 3)} className="px-3 py-1 text-sm bg-gray-200 rounded">Generar parrilla</button>
      )}
      <button aria-label onClick={handleLocalAssign} className="px-3 py-1 text-sm bg-emerald-400 text-white rounded">Propuesta IA (local)</button>
      <button aria-label onClick={handleServerAssign} className={`px-3 py-1 ${loadingAI ? 'bg-gray-400' : 'bg-purple-600'} text-white rounded`} disabled={loadingAI}>{loadingAI ? 'Esperando...' : 'Propuesta IA (servidor)'}</button>
    </div>
  );
}

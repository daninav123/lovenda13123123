import React, { useState, useRef, useEffect } from 'react';
import { Search, Cpu } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function SeatingPlan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  // Tab state for seating plan
  const [activeTab, setActiveTab] = useState('ceremony');
  // Tables for ceremony and banquet
  const ceremonyTables = [
    { id: 1, name: 'Mesa Ceremonia 1', capacity: 8, x: 50, y: 50, shape: 'circle' },
    { id: 2, name: 'Mesa Ceremonia 2', capacity: 6, x: 200, y: 100, shape: 'rect' },
  ];
  const banquetTables = [
    { id: 3, name: 'Mesa Banquete 1', capacity: 10, x: 100, y: 50, shape: 'circle' },
    { id: 4, name: 'Mesa Banquete 2', capacity: 8, x: 250, y: 120, shape: 'rect' },
  ];
  const tables = activeTab === 'ceremony' ? ceremonyTables : banquetTables;
  // Sample guests (replace with real data)
  const guests = [
    { id: 1, name: 'Ana García' },
    { id: 2, name: 'Luis Martínez' },
  ];

  // Drawing and seating state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokePoints, setStrokePoints] = useState([]);
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [seats, setSeats] = useState([]);
  const [shapePoints, setShapePoints] = useState([]);
  const [shapeFinalized, setShapeFinalized] = useState(false);

  // Util: point-in-polygon test
  const isPointInPolygon = (point, vs) => {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i].x, yi = vs[i].y;
      let xj = vs[j].x, yj = vs[j].y;
      let intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };
  const relatives = guests; // TODO: replace with actual closest relatives list

  // Generate and filter seats after area finalize
  useEffect(() => {
    if (!shapeFinalized) {
      setSeats([]);
      return;
    }
    const containerWidth = 600;
    const containerHeight = 500;
    const seatSize = 40;
    const hSpacing = cols > 1 ? (containerWidth - seatSize) / (cols - 1) : 0;
    const vSpacing = rows > 1 ? (containerHeight - seatSize) / (rows - 1) : 0;
    const newSeats = [];
    let id = 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * hSpacing;
        const y = r * vSpacing;
        const center = { x: x + seatSize / 2, y: y + seatSize / 2 };
        if (isPointInPolygon(center, shapePoints)) {
          newSeats.push({ id, row: r + 1, col: c + 1, x, y, assignedGuest: null });
          id++;
        }
      }
    }
    // Auto-assign relatives
    newSeats.forEach((seat, idx) => {
      if (relatives[idx]) seat.assignedGuest = relatives[idx].id;
    });
    setSeats(newSeats);
  }, [shapeFinalized, shapePoints, rows, cols, relatives]);

  // Draw strokes or finalized shape on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const pts = shapeFinalized ? shapePoints : strokePoints;
    if (pts.length === 0) return;
    if (shapeFinalized) {
      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      let prev = pts[0];
      for (let i = 1; i < pts.length; i++) {
        const cpX = (prev.x + pts[i].x) / 2;
        const cpY = (prev.y + pts[i].y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, cpX, cpY);
        prev = pts[i];
      }
      // close to first
      const cpX = (prev.x + pts[0].x) / 2;
      const cpY = (prev.y + pts[0].y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cpX, cpY);
    } else {
      ctx.beginPath();
      pts.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
    }
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [strokePoints, shapePoints, shapeFinalized]);

  const handleCanvasMouseDown = e => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setStrokePoints([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const handleCanvasMouseMove = e => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setStrokePoints(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const handleCanvasMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    // Finalizar trazado y guardar puntos
    setShapePoints(strokePoints);
    setShapeFinalized(true);
  };

  const filteredGuests = guests.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <>  

      <div className="flex space-x-2 mb-4">
        <button onClick={() => setActiveTab('ceremony')} className={`px-4 py-2 rounded ${activeTab==='ceremony'?'bg-blue-600 text-white':'bg-gray-200'}`}>
          Ceremonia
        </button>
        <button onClick={() => setActiveTab('banquet')} className={`px-4 py-2 rounded ${activeTab==='banquet'?'bg-blue-600 text-white':'bg-gray-200'}`}>
          Banquete
        </button>
      </div>
      <h1 className="text-2xl font-semibold">Seating Plan - {activeTab==='ceremony'?'Ceremonia':'Banquete'}</h1>
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Seating Plan</h1>
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-6">
          {/* Listado de invitados */}
          <div className="w-1/4 border rounded p-4">
            <div className="flex items-center border rounded px-2 py-1 mb-2">
              <Search size={16} className="mr-2 text-gray-600" />
              <input
                type="text"
                placeholder="Buscar invitados"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="outline-none w-full"
              />
            </div>
            <div className="space-y-2 overflow-auto max-h-[400px]">
              {filteredGuests.map(g => (
                <div
                  key={g.id}
                  className="border p-2 rounded cursor-move bg-white"
                >
                  {g.name}
                </div>
              ))}
            </div>
          </div>

          {/* Plano interactivo */}
          <div
            className="relative flex-1 border rounded p-4"
            style={{ height: '500px', position: 'relative' }}
          >
            <canvas
              ref={canvasRef}
              width={600}
              height={500}
              className="absolute top-0 left-0 w-full h-full z-0"
              onMouseDown={!shapeFinalized ? handleCanvasMouseDown : undefined}
              onMouseMove={!shapeFinalized ? handleCanvasMouseMove : undefined}
              onMouseUp={!shapeFinalized ? handleCanvasMouseUp : undefined}
            />
            {activeTab === 'ceremony' ? (
              <>
                {/* Drawing phase */}
                {!shapeFinalized && (
                  <>
                    <button
                      onClick={() => setIsDrawing(!isDrawing)}
                      className={`px-2 py-1 rounded ${isDrawing ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}
                    >
                      {isDrawing ? 'Detener dibujo' : 'Iniciar dibujo'}
                    </button>
                    <button
                      onClick={() => {
                        setIsDrawing(false);
                        setShapePoints(strokePoints);
                        setShapeFinalized(true);
                      }}
                      className="px-2 py-1 ml-2 bg-green-600 text-white rounded"
                    >
                      Finalizar área
                    </button>

                  </>
                )}
                {/* Seat placement phase */}
                {shapeFinalized && (
                  <>
                    <div className="flex gap-2 mb-2">
                      <label className="flex items-center">
                        Filas:
                        <input
                          type="number"
                          min="1"
                          value={rows}
                          onChange={e => setRows(parseInt(e.target.value) || 1)}
                          className="ml-1 w-16 border rounded px-2 py-1"
                        />
                      </label>
                      <label className="flex items-center">
                        Columnas:
                        <input
                          type="number"
                          min="1"
                          value={cols}
                          onChange={e => setCols(parseInt(e.target.value) || 1)}
                          className="ml-1 w-16 border rounded px-2 py-1"
                        />
                      </label>
                    </div>
                    {seats.map(seat => (
                      <div
                        key={seat.id}
                        className="absolute z-10 flex items-center justify-center border bg-white"
                        style={{ left: seat.x, top: seat.y, width: 40, height: 40 }}
                      >
                        <span className="text-xs">{seat.row}-{seat.col}</span>
                        {seat.assignedGuest && (
                          <span
                            className="text-red-600 absolute bottom-0 right-0 text-xs cursor-pointer"
                            onClick={() => alert('Editar asiento ' + seat.id)}
                          >
                            ✏️
                          </span>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </>
            ) : (
              tables.map(table => (
                <div
                  key={table.id}
                  className={`absolute p-2 flex flex-col items-center justify-center ${table.shape === 'circle' ? 'rounded-full' : 'rounded'} bg-gray-200`}
                  style={{ left: table.x, top: table.y, width: 80, height: 80 }}
                >
                  <p className="text-sm font-semibold">{table.name}</p>
                  <p className="text-xs">{table.capacity} pax</p>
                </div>
              ))
            )}
          </div>
        </div>
      </DndProvider>

      {/* IA y acciones */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Criterios de IA"
          value={aiPrompt}
          onChange={e => setAiPrompt(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
        <button className="bg-purple-600 text-white px-4 py-1 rounded flex items-center">
          <Cpu size={16} className="mr-2" />Autoasignar
        </button>
        <button className="bg-gray-200 px-4 py-1 rounded">Exportar PDF</button>
      </div>
    </div>
  </>
  );
}

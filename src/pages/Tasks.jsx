import React, { useState, useEffect, useRef } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';

// ICS y utilidades de calendario
function formatICalDate(date) {
  const pad = n => String(n).padStart(2,'0');
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth()+1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function generateFullICS(events) {
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Lovenda//WeddingApp//ES'];
  events.forEach(evt => {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${evt.id}`);
    lines.push(`DTSTAMP:${formatICalDate(new Date())}`);
    lines.push(`DTSTART:${formatICalDate(evt.start)}`);
    lines.push(`DTEND:${formatICalDate(evt.end)}`);
    lines.push(`SUMMARY:${evt.title}`);
    if (evt.desc) lines.push(`DESCRIPTION:${evt.desc}`);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

const downloadAllICS = (events) => {
  const icsContent = generateFullICS(events);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'calendario_wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'gantt-task-react/dist/index.css';
import './Tasks.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { es } from 'date-fns/locale/es';

const locales = {
  'es-ES': es
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Categorías de tareas con sus colores
const categories = {
  LUGAR: { name: 'Lugar', color: '#10b981', bgColor: '#d1fae5', borderColor: '#34d399' },
  FOTOGRAFO: { name: 'Fotógrafo', color: '#f59e0b', bgColor: '#fef3c7', borderColor: '#fbbf24' },
  MUSICA: { name: 'Música', color: '#ef4444', bgColor: '#fee2e2', borderColor: '#f87171' },
  VESTUARIO: { name: 'Vestuario', color: '#8b5cf6', bgColor: '#ede9fe', borderColor: '#a78bfa' },
  CATERING: { name: 'Catering', color: '#3b82f6', bgColor: '#dbeafe', borderColor: '#60a5fa' },
  OTROS: { name: 'Otros', color: '#6b7280', bgColor: '#f3f4f6', borderColor: '#9ca3af' }
};

// Estilos personalizados para el calendario
const eventStyleGetter = (event) => {
  const category = categories[event.category] || categories.OTROS;
  return { style: { backgroundColor: category.bgColor, color: '#1f2937', border: `2px solid ${category.color}`, borderRadius: '4px', opacity: 0.9, display: 'block', fontSize: '0.85rem', padding: '2px 4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' } };
};

// Componente para renderizar cada evento en el calendario
const Event = ({ event }) => {
  const category = categories[event.category] || categories.OTROS;
  return (
    <div className="p-1">
      <div className="flex items-center">
        <div className="w-1.5 h-1.5 rounded-full mr-1 flex-shrink-0" style={{ backgroundColor: category.color }} />
        <span className="truncate font-medium">{event.title}</span>
      </div>
    </div>
  );
};

// Tareas a largo plazo para el Gantt
const tasks = [
  { start: new Date(2025,0,1), end: new Date(2025,2,31), name: 'Buscar lugar de la boda', id: '1', type: 'task', category: 'LUGAR', progress: 20, isDisabled: false, dependencies: [] },
  { start: new Date(2025,3,1), end: new Date(2025,4,15), name: 'Buscar fotógrafo', id: '2', type: 'task', category: 'FOTOGRAFO', progress: 10, isDisabled: false, dependencies: [] },
  { start: new Date(2025,2,15), end: new Date(2025,3,30), name: 'Contratar grupo musical', id: '3', type: 'task', category: 'MUSICA', progress: 5, isDisabled: false, dependencies: [] }
];

// Reuniones y eventos adicionales
const meetings = [
  { id: 'm1', title: 'Visita al salón de eventos', start: new Date(2025,5,10,10,0), end: new Date(2025,5,10,11,30), type: 'meeting', category: 'LUGAR', desc: 'Ver las instalaciones y paquetes disponibles', location: 'Salón Las Dalias, Calle Principal 123' },
  { id: 'm2', title: 'Reunión con fotógrafo', start: new Date(2025,5,12,16,0), end: new Date(2025,5,12,17,0), type: 'meeting', category: 'FOTOGRAFO', desc: 'Revisar portafolio y paquetes', contact: 'Fotografía Martínez, 555-1234' },
  { id: 'm3', title: 'Prueba de vestido', start: new Date(2025,5,15,16,0), end: new Date(2025,5,15,18,0), type: 'task', category: 'VESTUARIO', desc: 'Llevar zapatos y joyas', location: 'Boutique Elegancia, Centro Comercial Galerías' },
  { id: 'm4', title: 'Prueba de sonido con la banda', start: new Date(2025,5,18,19,0), end: new Date(2025,5,18,21,0), type: 'task', category: 'MUSICA', desc: 'Llevar lista de canciones', contact: 'Banda Sonora Perfecta, 555-5678' },
  { id: 'm5', title: 'Cata de menú', start: new Date(2025,5,20,12,0), end: new Date(2025,5,20,13,0), type: 'meeting', category: 'CATERING', desc: 'Probar opciones de menú y postres', location: 'Catering Delicias, Av. Principal 456' }
];

export default function Tasks() {
  const [currentView, setCurrentView] = useState('month');
  const ganttRef = useRef(null);
  const listCellWidth = 40; // restored minimal list column width to maintain grid alignment // hide name column entirely
  const [columnWidthState, setColumnWidthState] = useState(0);

  useEffect(() => {
    if (!ganttRef.current) return;
    const containerWidth = ganttRef.current.clientWidth;
    const dates = tasks.flatMap(t => [t.start, t.end]);
    const minTime = Math.min(...dates.map(d => d.getTime()));
    const maxTime = Math.max(...dates.map(d => d.getTime()));
    const minDate = new Date(minTime);
    const maxDate = new Date(maxTime);
    const monthsCount = (maxDate.getFullYear() - minDate.getFullYear()) * 12 + (maxDate.getMonth() - minDate.getMonth()) + 1;
    const availableWidth = containerWidth - listCellWidth;
    const cw = Math.min(Math.floor(availableWidth / monthsCount), 50); // cap column width at 50px to avoid horizontal scroll // cap column width at 60px to further avoid horizontal scroll // cap column width at 80px to avoid horizontal scroll // cap column width at 80px to avoid horizontal scroll
    setColumnWidthState(cw);
  }, [tasks]);
  const allEvents = [ ...meetings, ...tasks.map(task => ({ id: task.id, title: task.name, start: task.start, end: task.end, type: 'task', desc: `Progreso: ${task.progress}%`, category: task.category })) ];

  // Notificaciones push para eventos
  useEffect(() => {
    if (!('Notification' in window)) return;
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        allEvents.forEach(evt => {
          const now = new Date();
          const timeToEvent = evt.start - now - 10 * 60 * 1000; // 10 min antes
          if (timeToEvent > 0) {
            setTimeout(() => {
              new Notification(`Próximo evento: ${evt.title}`, { body: `Empieza a las ${evt.start.toLocaleTimeString()}` });
            }, timeToEvent);
          }
        });
      }
    });
  }, [allEvents]);
  const safeEvents = allEvents.map(event => ({ ...event, start: event.start instanceof Date ? event.start : new Date(event.start), end: event.end instanceof Date ? event.end : new Date(event.end) }));

  return (
    <div className="p-4 md:p-6 space-y-8">
      <style>{` 
        ._1nBOt > *:nth-child(n+2),
        ._34SS0 > *:nth-child(n+2) {
          display: none !important;
        }
      `}</style>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Tareas y Eventos</h1>
        <details className="relative inline-block">
          <summary className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">Sincronizar calendario</summary>
          <div className="absolute left-0 mt-2 bg-white border rounded shadow p-2 space-y-1">
            <button onClick={() => downloadAllICS(allEvents)} className="w-full text-left text-gray-800 hover:bg-gray-100 p-1">Exportar .ics</button>
            <button onClick={() => window.open('/calendar.ics','_blank')} className="w-full text-left text-gray-800 hover:bg-gray-100 p-1">Suscribirse iCal</button>
            <a href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(window.location.origin + '/calendar.ics')}`} target="_blank" rel="noopener" className="w-full block text-left text-gray-800 hover:bg-gray-100 p-1">Google Calendar</a>
            <a href={`https://outlook.live.com/owa/?path=/calendar/view&rru=addsubscription&url=${encodeURIComponent(window.location.origin + '/calendar.ics')}`} target="_blank" rel="noopener" className="w-full block text-left text-gray-800 hover:bg-gray-100 p-1">Outlook Calendar</a>
          </div>
        </details>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Vista del Proyecto</h2>
        <div ref={ganttRef} className="w-full overflow-x-hidden" style={{ marginLeft: -listCellWidth, paddingLeft: listCellWidth }}>
          <Gantt tasks={tasks} viewMode={ViewMode.Month} listCellWidth={listCellWidth} columnWidth={columnWidthState} locale="es" barFill={60} barCornerRadius={4} barProgressColor="#4f46e5" barProgressSelectedColor="#4338ca" barBackgroundColor="#a5b4fc" barBackgroundSelectedColor="#818cf8" todayColor="rgba(252,165,165,0.2)" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Calendario</h2>
              <div className="flex space-x-2 mt-2">
                <button onClick={() => setCurrentView('month')} className={`px-3 py-1 text-sm rounded ${currentView==='month'?'bg-pink-500 text-white':'bg-gray-200'}`}>Mes</button>
                <button onClick={() => setCurrentView('week')} className={`px-3 py-1 text-sm rounded ${currentView==='week'?'bg-pink-500 text-white':'bg-gray-200'}`}>Semana</button>
                <button onClick={() => setCurrentView('day')} className={`px-3 py-1 text-sm rounded ${currentView==='day'?'bg-pink-500 text-white':'bg-gray-200'}`}>Día</button>
              </div>
            </div>
            <div className="p-2">
              <Calendar localizer={localizer} events={safeEvents} startAccessor="start" endAccessor="end" style={{height:500}} defaultView="month" view={currentView} onView={setCurrentView} components={{ event: Event }} eventPropGetter={eventStyleGetter} messages={{ next:'Siguiente', previous:'Anterior', today:'Hoy', month:'Mes', week:'Semana', day:'Día', noEventsInRange:'No hay eventos en este rango.' }} />
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Próximas Tareas</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(categories).map(([key,cat])=>(<div key={key} className="flex items-center text-xs"><div className="w-3 h-3 rounded-full mr-1" style={{backgroundColor:cat.color}} />{cat.name}</div>))}
              </div>
            </div>
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              {safeEvents.sort((a,b)=>a.start-b.start).filter(e=>e.start>=new Date()).slice(0,8).map(event=>{const cat=categories[event.category]||categories.OTROS;return(<div key={event.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow" style={{borderColor:cat.borderColor,backgroundColor:`${cat.bgColor}40`}}><div className="flex items-start"><div className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{backgroundColor:cat.color}} /><div className="flex-1"><div className="font-medium flex justify-between"><span>{event.title}</span><span className="text-xs text-gray-500">{event.start.toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})}</span></div>{event.desc&&<div className="text-xs mt-1 text-gray-700">{event.desc}</div>}{event.location&&<div className="text-xs mt-1 flex items-center text-gray-600"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9"/></svg>{event.location}</div>}{event.contact&&<div className="text-xs mt-1 flex items-center text-gray-600"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2"/></svg>{event.contact}</div>}</div></div><div className="mt-2 flex justify-between items-center"><span className="text-xs px-2 py-1 rounded-full" style={{backgroundColor:`${cat.color}20`,color:cat.color}}>{cat.name}</span><span className="text-xs text-gray-500">{event.start.toLocaleDateString('es-ES',{weekday:'short',day:'numeric',month:'short'})}</span></div></div>)} )}
              {safeEvents.filter(e=>e.start>=new Date()).length===0&&<div className="text-center text-gray-500 py-4">No hay tareas próximas</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



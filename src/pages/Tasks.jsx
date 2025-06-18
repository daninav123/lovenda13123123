import React from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

// Tareas a largo plazo para el Gantt
const tasks = [
  {
    start: new Date(2025, 0, 1),
    end: new Date(2025, 2, 31),
    name: 'Buscar lugar de la boda',
    id: '1',
    type: 'task',
    progress: 20,
    isDisabled: false,
    dependencies: [],
  },
  {
    start: new Date(2025, 3, 1),
    end: new Date(2025, 4, 15),
    name: 'Buscar traje',
    id: '2',
    type: 'task',
    progress: 10,
    isDisabled: false,
    dependencies: [],
  },
];

// Reuniones concretas para la lista detallada
const meetings = [
  {
    id: 'm1',
    name: 'Reunión de prueba A',
    date: new Date(2025, 5, 10),
  },
  {
    id: 'm2',
    name: 'Entregar contrato',
    date: new Date(2025, 5, 20),
  },
];  

export default function Tasks() {  
  return (  
    <div className="p-6">  
      <h1 className="text-2xl font-semibold mb-4">Diagrama de Gantt</h1>  
      <Gantt tasks={tasks} viewMode={ViewMode.Month} columns={[{ header: 'Tarea', name: 'name', width: 200 }]} />  
      <h2 className="text-xl font-semibold mt-8 mb-4">Reuniones concretas</h2>
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-medium">{meeting.name}</h3>
            <p><strong>Fecha:</strong> {meeting.date.toLocaleDateString()}</p>
          </div>
        ))}
      </div>  
    </div>  
  );  
}

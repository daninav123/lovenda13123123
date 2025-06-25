import React from 'react';

const SAMPLE_TASKS = [
  { id: 1, title: 'Reservar salón', dueDate: '2023-12-15', priority: 'high', completed: false },
  { id: 2, title: 'Contratar fotógrafo', dueDate: '2023-12-20', priority: 'high', completed: false },
  { id: 3, title: 'Elegir menú', dueDate: '2024-01-10', priority: 'medium', completed: true },
  { id: 4, title: 'Enviar invitaciones', dueDate: '2024-01-30', priority: 'low', completed: false },
];

export const TasksWidget = ({ config }) => {
  const filteredTasks = config.showCompleted 
    ? SAMPLE_TASKS 
    : SAMPLE_TASKS.filter(task => !task.completed);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (config.sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (config.sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      // Default: sort by due date
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full">
      <div className="space-y-2">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <div 
              key={task.id} 
              className={`p-2 rounded border ${
                task.completed ? 'bg-gray-50 opacity-70' : 'bg-white'
              }`}
            >
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  readOnly
                  className="mt-1 mr-2"
                />
                <div className="flex-1">
                  <div className={`flex justify-between ${task.completed ? 'line-through' : ''}`}>
                    <span>{task.title}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(task.dueDate).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  {!task.completed && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No hay tareas pendientes
          </div>
        )}
      </div>
      <div className="mt-4 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Ver todas las tareas →
        </button>
      </div>
    </div>
  );
};

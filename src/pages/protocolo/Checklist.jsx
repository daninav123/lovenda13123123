import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const Checklist = () => {
  const [activeTab, setActiveTab] = useState('dia-previo');
  const [newTask, setNewTask] = useState('');
  
  const [checklist, setChecklist] = useState({
    'dia-previo': [
      { id: 1, task: 'Recoger trajes y vestidos', responsible: 'Novio', dueDate: '2025-06-20', status: 'pending' },
      { id: 2, task: 'Ensayo general de la ceremonia', responsible: 'Ambos', dueDate: '2025-06-20', status: 'pending' },
      { id: 3, task: 'Confirmar horarios con proveedores', responsible: 'Novia', dueDate: '2025-06-20', status: 'completed' },
    ],
    'antes-inicio': [
      { id: 4, task: 'Revisar decoración del lugar', responsible: 'Madrina', dueDate: '2025-06-21', status: 'pending' },
      { id: 5, task: 'Preparar discurso', responsible: 'Padre del novio', dueDate: '2025-06-21', status: 'pending' },
    ]
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const newTaskObj = {
      id: Date.now(),
      task: newTask.trim(),
      responsible: '',
      dueDate: '',
      status: 'pending'
    };

    setChecklist(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newTaskObj]
    }));
    
    setNewTask('');
  };

  const toggleTaskStatus = (tab, taskId) => {
    setChecklist(prev => ({
      ...prev,
      [tab]: prev[tab].map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
          : task
      )
    }));
  };

  const deleteTask = (tab, taskId) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      setChecklist(prev => ({
        ...prev,
        [tab]: prev[tab].filter(task => task.id !== taskId)
      }));
    }
  };

  const updateTaskField = (tab, taskId, field, value) => {
    setChecklist(prev => ({
      ...prev,
      [tab]: prev[tab].map(task => 
        task.id === taskId ? { ...task, [field]: value } : task
      )
    }));
  };

  const tabs = [
    { id: 'dia-previo', name: 'Día Previo a la Boda' },
    { id: 'antes-inicio', name: 'Antes de Empezar' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Checklist de Protocolo</h2>
        <p className="text-gray-600">Organiza las tareas previas al gran día</p>
      </div>

      {/* Pestañas */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {checklist[tab.id].length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Formulario para añadir tarea */}
      <form onSubmit={handleAddTask} className="flex space-x-2">
        <div className="flex-1">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nueva tarea..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Button type="submit" disabled={!newTask.trim()}>
          Añadir
        </Button>
      </form>

      {/* Lista de tareas */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {checklist[activeTab].length === 0 ? (
            <li className="p-6 text-center text-gray-500">
              No hay tareas en esta sección. ¡Añade tu primera tarea!
            </li>
          ) : (
            checklist[activeTab].map((task) => (
              <li key={task.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => toggleTaskStatus(activeTab, task.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex-1">
                    <div className={`flex items-center ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      <span className="font-medium">{task.task}</span>
                    </div>
                    <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500">
                      <div className="mt-1 sm:mt-0 sm:ml-4">
                        <span className="mr-2">Responsable:</span>
                        <select
                          value={task.responsible}
                          onChange={(e) => updateTaskField(activeTab, task.id, 'responsible', e.target.value)}
                          className="border-b border-dashed border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Seleccionar</option>
                          <option value="Novio">Novio</option>
                          <option value="Novia">Novia</option>
                          <option value="Ambos">Ambos</option>
                          <option value="Madrina">Madrina</option>
                          <option value="Padrino">Padrino</option>
                          <option value="Padres">Padres</option>
                          <option value="Wedding Planner">Wedding Planner</option>
                        </select>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:ml-4">
                        <span className="mr-2">Fecha:</span>
                        <input
                          type="date"
                          value={task.dueDate}
                          onChange={(e) => updateTaskField(activeTab, task.id, 'dueDate', e.target.value)}
                          className="border-b border-dashed border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(activeTab, task.id)}
                    className="ml-2 text-gray-400 hover:text-red-500"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Estadísticas */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Tareas</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {checklist[activeTab].length}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Completadas</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">
              {checklist[activeTab].filter(t => t.status === 'completed').length}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Pendientes</dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-600">
              {checklist[activeTab].filter(t => t.status === 'pending').length}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;

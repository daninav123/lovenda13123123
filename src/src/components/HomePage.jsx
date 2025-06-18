import React from 'react';
import { useUserContext } from '../context/UserContext';
import { Card } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';

export default function HomePage() {
  const { role, userName, weddingName, progress } = useUserContext();

  const statsNovios = [
    { label: 'Invitados confirmados', value: 120 },
    { label: 'Presupuesto gastado', value: '€8,500' },
    { label: 'Proveedores contratados vs necesarios', value: '5 / 8' },
    { label: 'Tareas completadas vs programadas', value: '25 / 30' },
  ];

  const statsPlanner = [
    { label: 'Tareas asignadas', value: 12 },
    { label: 'Proveedores asignados', value: 3 },
    { label: 'Momentos por coordinar', value: 4 },
  ];

  const statsCommon = role === 'particular' ? statsNovios : statsPlanner;

  return (
    <div className="min-h-screen bg-pastel-yellow flex flex-col">
      <header className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {role === 'particular'
            ? '¡Hola ' + userName + '! Bienvenidos a ' + weddingName
            : '¡Hola ' + userName + '! Estás gestionando ' + weddingName}
        </h2>
      </header>
      <section className="p-4">
        <Progress
          className="h-3 rounded-full mb-4"
          value={progress}
          max={100}
          variant={
            progress >= 100
              ? 'success'
              : progress >= 80
              ? 'primary'
              : 'destructive'
          }
        />
        <p className="text-sm text-gray-600 mb-3">{progress}% completado</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 flex-grow">
        {statsCommon.map((stat, idx) => (
          <Card key={idx} className="p-4">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-xl font-bold text-pastel-blue mt-1">{stat.value}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}

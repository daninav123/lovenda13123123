import React, { useRef } from 'react';
import { useUserContext } from '../context/UserContext';
import { Card } from './ui/Card';
import { Progress } from './ui/Progress';
import Nav from './Nav';

import { User, DollarSign, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';


import inspo1 from '../assets/inspo1.jpg';
import inspo2 from '../assets/inspo2.jpg';
import inspo3 from '../assets/inspo3.jpg';
import inspo4 from '../assets/inspo4.jpg';

export default function HomePage() {
  const { role, userName, weddingName, progress, logoUrl } = useUserContext();
  const galleryRef = useRef(null);
  const scrollAmount = 300;

  const scrollPrev = () => {
    galleryRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollNext = () => {
    galleryRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const statsNovios = [
    { label: 'Invitados confirmados', value: 120, icon: Users },
    { label: 'Presupuesto gastado', value: '€8,500', icon: DollarSign },
    { label: 'Proveedores contratados', value: '5 / 8', icon: User },
    { label: 'Tareas completadas', value: '25 / 30', icon: Calendar },
  ];

  const statsPlanner = [
    { label: 'Tareas asignadas', value: 12, icon: Calendar },
    { label: 'Proveedores asignados', value: 3, icon: User },
    { label: 'Momentos por coordinar', value: 4, icon: Users },
    { label: 'Presupuesto gastado', value: '€4,500', icon: DollarSign },
  ];

  const statsCommon = role === 'particular' ? statsNovios : statsPlanner;

  return (
    <div className="relative flex flex-col h-full bg-pastel-yellow pb-16">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pastel-pink rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-2xl text-gray-800">Bienvenidos, {userName}</p>
          <p className="text-4xl font-bold text-gray-800">Cada detalle hace tu boda inolvidable</p>
        </div>
        <img
            src={`${import.meta.env.BASE_URL}logo-app.png`}
            alt="Logo de la boda"
            className="w-32 h-32 object-contain"
          />
      </header>

      {/* Progress Section */}
      <section className="z-10 w-full p-6">
        <Card className="bg-white/70 backdrop-blur-md p-4 w-full">
          <p className="text-sm text-gray-600 mb-2">Progreso de tareas</p>
          <Progress
            className="h-4 rounded-full w-full"
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
          <p className="mt-2 text-sm font-medium text-gray-700">
            {progress}% completado
          </p>
        </Card>
      </section>

      {/* Stats Cards */}
      <section className="z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 flex-grow">
        {statsCommon.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              className="p-4 bg-white/80 backdrop-blur-md hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <Icon className="text-pastel-blue" />
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
              <p className="text-2xl font-extrabold text-blue-600 mt-2">
                {stat.value}
              </p>
            </Card>
          );
        })}
      </section>

      {/* Inspiration Gallery */}
      <section className="z-10 p-6">
        
        <div className="relative">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow-md"
          >
            <ChevronLeft className="text-gray-700" />
          </button>
          <div
            ref={galleryRef}
            className="flex space-x-4 py-2 overflow-hidden scroll-smooth"
          >
            {[inspo1, inspo2, inspo3, inspo4].map((src, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-80 h-56 rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src={src}
                  alt={`Inspiración ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow-md"
          >
            <ChevronRight className="text-gray-700" />
          </button>
        </div>
      </section>

      {/* News & Articles */}
      <section className="z-10 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Últimas Noticias
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Tendencias en decoraciones nupciales 2025',
              url: '#',
              source: 'Blog de Bodas',
            },
            {
              title: 'Cómo elegir el menú perfecto para tu boda',
              url: '#',
              source: 'Revista Eventos',
            },
            {
              title: 'Guía definitiva de flores de temporada',
              url: '#',
              source: 'Noticias Florales',
            },
          ].map((article, idx) => (
            <Card key={idx} className="p-4 hover:shadow-lg transition">
              <p className="text-lg font-medium text-gray-800">
                {article.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {article.source}
              </p>
              <a
                href={article.url}
                className="inline-flex items-center text-blue-600 mt-2"
              >
                Leer más <ChevronRight className="ml-1" />
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full z-20">
        <Nav />
      </div>
    </div>
  );
}

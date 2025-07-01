import React from 'react';
import Modal from './Modal';

const templates = [
  {
    id: 'circle8',
    name: 'Círculo de 8 mesas',
    generate: () => {
      const radius = 180;
      const center = { x: 300, y: 220 };
      return Array.from({ length: 8 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 8;
        return {
          id: i + 1,
          x: center.x + Math.cos(angle) * radius,
          y: center.y + Math.sin(angle) * radius,
          shape: 'circle',
          seats: 8,
        };
      });
    },
  },
  {
    id: 'rows20',
    name: 'Filas 2 x 10',
    generate: () => {
      const tables = [];
      const startX = 120;
      const startY = 120;
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 10; col++) {
          tables.push({
            id: row * 10 + col + 1,
            x: startX + col * 90,
            y: startY + row * 120,
            shape: 'rect',
            seats: 8,
          });
        }
      }
      return tables;
    },
  },
  {
    id: 'u12',
    name: 'Forma U 12 mesas',
    generate: () => {
      const tables = [];
      const leftX = 120;
      const rightX = 600;
      const startY = 120;
      for (let i = 0; i < 4; i++) {
        tables.push({ id: i + 1, x: leftX, y: startY + i * 100, shape: 'rect', seats: 8 });
      }
      for (let i = 0; i < 4; i++) {
        tables.push({ id: 5 + i, x: rightX, y: startY + i * 100, shape: 'rect', seats: 8 });
      }
      for (let i = 0; i < 4; i++) {
        tables.push({ id: 9 + i, x: leftX + 120 + i * 110, y: startY + 4 * 100, shape: 'rect', seats: 8 });
      }
      return tables;
    },
  },
];

export default function TemplatesModal({ open, onApply, onClose }) {
  return (
    <Modal open={open} title="Plantillas de diseño" onClose={onClose}>
      <div className="space-y-3">
        {templates.map((tpl) => (
          <div key={tpl.id} className="flex justify-between items-center border p-2 rounded">
            <span>{tpl.name}</span>
            <button
              onClick={() => onApply(tpl.generate())}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Aplicar
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

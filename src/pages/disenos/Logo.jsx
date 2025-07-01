import React, { useState } from 'react';
import Card from '../../components/Card';
import UploadImageCard from '../../components/UploadImageCard';

export default function Logo() {
  const [hex, setHex] = useState(() => localStorage.getItem('logoColor') || '#FF69B4');

  const handleColor = (e) => {
    setHex(e.target.value);
    localStorage.setItem('logoColor', e.target.value);
  };

  return (
    <div className="space-y-6">
      <UploadImageCard title="Subir Logo" storageKey="logoImage" />

      <Card className="p-4 flex flex-col gap-4 items-start">
        <h2 className="text-lg font-semibold">Color principal</h2>
        <input
          type="color"
          value={hex}
          onChange={handleColor}
          className="w-16 h-10 p-0 border-0 cursor-pointer"
          aria-label="Seleccionar color del logo"
        />
        <p className="text-sm text-gray-600">Código: {hex}</p>
      </Card>
    </div>
  );
}

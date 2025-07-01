import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './GuestItem';

// Basic draggable table (circle or rectangle)
export default function TableItem({ table, scale, offset, onMove, onAssignGuest, onToggleEnabled, onOpenConfig }) {
  const ref = useRef(null);

  // drop logic
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.GUEST,
    canDrop: () => table.enabled !== false && !table.guestId,
    drop: (item) => onAssignGuest(table.id, item.id),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }), [table.id]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const start = { x: e.clientX, y: e.clientY };
    const orig = { x: table.x, y: table.y };
    const move = (ev) => {
      const dx = (ev.clientX - start.x) / scale;
      const dy = (ev.clientY - start.y) / scale;
      onMove(table.id, { x: orig.x + dx, y: orig.y + dy });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const size = 60; // logical units
  const disabled = table.enabled === false;
  const style = {
    position: 'absolute',
    left: table.x * scale + offset.x - (size * scale) / 2,
    top: table.y * scale + offset.y - (size * scale) / 2,
    width: size * scale,
    height: size * scale,
    backgroundColor: disabled ? '#e5e7eb' : '#fef3c7',
    border: '2px solid #f59e0b',
    borderRadius: table.shape === 'circle' ? '50%' : '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'grab',
    userSelect: 'none'
  };

  return (
    <div ref={node => {ref.current=node; drop(node);}} 
      style={{...style, backgroundColor: isOver ? '#d1fae5' : style.backgroundColor}} 
      onPointerDown={disabled ? undefined : handlePointerDown}
      onContextMenu={e=>{e.preventDefault(); onToggleEnabled(table.id);}}
      onDoubleClick={()=>onOpenConfig(table)}> 
      <button 
        onClick={(e)=>{e.stopPropagation(); onAssignGuest(table.id, null);}}
        className="absolute top-0 right-0 text-xs px-1 text-red-600">✖</button>
      {table.guestId ? `👤 ${table.guestName}` : 'Libre'}
    {disabled && <div className="absolute inset-0 bg-white bg-opacity-50 rounded" />} 
      {/* seats */}
      {(() => {
        if (table.shape === 'rect') {
          const cols = Math.ceil((table.seats || 8) / 2);
          return Array.from({ length: table.seats || 8 }).map((_, i) => {
            const isTop = i < cols;
            const idx = isTop ? i : i - cols;
            const px = (size * scale) / (cols + 1) * (idx + 1);
            const py = isTop ? 4 : size * scale - 4;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  background: '#6b7280',
                  borderRadius: '50%',
                  left: px - 3,
                  top: py - 3,
                }}
              />
            );
          });
        }
        const seats = table.seats || 8;
        return Array.from({ length: seats }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / seats;
          const r = (size * scale) / 2 + 8;
          const sx = (size * scale) / 2 + Math.cos(angle) * r;
          const sy = (size * scale) / 2 + Math.sin(angle) * r;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 6,
                height: 6,
                background: '#6b7280',
                borderRadius: '50%',
                left: sx - 3,
                top: sy - 3,
              }}
            />
          );
        });
      })()}

    </div>
  );
}

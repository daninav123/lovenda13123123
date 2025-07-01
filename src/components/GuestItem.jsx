import React from 'react';
import { useDrag } from 'react-dnd';

export const ItemTypes = { GUEST: 'guest' };

function GuestItem({ guest }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.GUEST,
    item: { id: guest.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }), [guest.id]);

  return (
    <div ref={drag}
      className={`p-2 mb-1 border rounded bg-white cursor-grab ${isDragging ? 'opacity-50' : ''}`}
      aria-label={`Invitado ${guest.name}`}
    >
      {guest.name}
    </div>
  );
}

export default React.memo(GuestItem);

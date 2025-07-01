import React, { useState, useMemo } from 'react';
import { Star, StarOff, X } from 'lucide-react';

// Ejemplo estático: en producción vendrá de API o CMS
const IMAGES = [
  { id: 1, url: 'https://source.unsplash.com/400x300/?wedding,ceremony', tags: ['ceremonia'] },
  { id: 2, url: 'https://source.unsplash.com/400x300/?wedding,flowers', tags: ['decoración'] },
  { id: 3, url: 'https://source.unsplash.com/400x300/?wedding,cocktail', tags: ['cóctel'] },
  { id: 4, url: 'https://source.unsplash.com/400x300/?wedding,reception', tags: ['banquete'] },
  { id: 5, url: 'https://source.unsplash.com/400x300/?wedding,dance', tags: ['disco'] },
  { id: 6, url: 'https://source.unsplash.com/400x300/?wedding,table', tags: ['banquete'] },
];

export default function InspirationGallery() {
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [lightbox, setLightbox] = useState(null); // id

  const allTags = useMemo(() => {
    const tags = new Set();
    IMAGES.forEach(img => img.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return IMAGES;
    return IMAGES.filter(img => img.tags.includes(filter));
  }, [filter]);

  const toggleFav = id => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded text-xs border ${filter==='all'?'bg-blue-600 text-white':'bg-white'}`}>Todos</button>
        {allTags.map(tag => (
          <button key={tag} onClick={()=>setFilter(tag)} className={`px-3 py-1 rounded text-xs border capitalize ${filter===tag?'bg-blue-600 text-white':'bg-white'}`}>{tag}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map(img => (
          <div key={img.id} className="relative group cursor-pointer" onClick={()=>setLightbox(img.id)}>
            <img src={img.url} alt="inspiration" className="w-full h-32 object-cover rounded" loading="lazy" />
            <button
              onClick={e=>{e.stopPropagation();toggleFav(img.id);}}
              className="absolute top-1 right-1 text-white drop-shadow-md"
            >
              {favorites.includes(img.id)?<Star size={18} fill="#facc15"/>:<StarOff size={18} />}
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative">
            <img src={IMAGES.find(i=>i.id===lightbox).url} alt="" className="max-h-[80vh] rounded" />
            <button onClick={()=>setLightbox(null)} className="absolute -top-4 -right-4 bg-white rounded-full p-1"><X size={20}/></button>
          </div>
        </div>
      )}
    </div>
  );
}

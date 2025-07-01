import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import Spinner from './Spinner';

export default function ChatWidget() {
  const [open, setOpen] = useState(() => { const saved = localStorage.getItem('chatOpen'); return saved ? JSON.parse(saved) : false; });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatOpen', JSON.stringify(open));
  }, [open]);

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_KEY}`
        },
        body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [ { role: 'user', content: input } ] })
      });
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || 'Sin respuesta de IA';
      const botMsg = { from: 'bot', text };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Error al llamar a la API de IA' }]);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden z-50">
          <div className="bg-blue-600 text-white p-2 flex items-center">
            <MessageSquare className="mr-2" /> Chat IA
          </div>
          <div className="flex-1 p-2 overflow-y-auto relative">
                          {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                <Spinner />
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-2 ${m.from === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span className="inline-block p-2 rounded bg-gray-200">{m.text}</span>
              </div>
            ))}
          </div>
          <div className="p-2 flex">
            <input aria-label="Mensaje de chat"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="Escribe..."
            />
            <motion.button onClick={sendMessage} aria-label="Enviar mensaje" className="ml-2 bg-blue-600 text-white px-3 rounded" disabled={loading}>
              Enviar
            </motion.button>
          </div>
        </div>
      )}
      <motion.button
        onClick={() => setOpen(!open)} aria-label={open ? "Cerrar chat" : "Abrir chat"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageSquare />
      </motion.button>
    </>
  );
}

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input) return;
    const userMsg = { from: 'user', text: input };
    const botMsg = { from: 'bot', text: 'Respuesta de IA (simulada)' };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden z-50">
          <div className="bg-blue-600 text-white p-2 flex items-center">
            <MessageSquare className="mr-2" /> Chat IA
          </div>
          <div className="flex-1 p-2 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.from === 'user' ? 'text-right' : 'text-left'}`}>
                <span className="inline-block p-2 rounded bg-gray-200">{m.text}</span>
              </div>
            ))}
          </div>
          <div className="p-2 flex">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="Escribe..."
            />
            <button onClick={sendMessage} className="ml-2 bg-blue-600 text-white px-3 rounded">
              Enviar
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <MessageSquare />
      </button>
    </>
  );
}

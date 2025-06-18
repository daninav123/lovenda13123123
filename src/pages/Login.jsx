import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      login(username);
      navigate('/home');
    } else {
      setError('Usuario o contraseña inválidos');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-pastel-yellow">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-pastel-blue text-white px-4 py-2 rounded w-full hover:bg-pastel-green transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

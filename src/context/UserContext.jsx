import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  role: 'particular',
  userName: 'Juan y María',
  weddingName: 'Nuestra Boda',
  progress: 50,
  logoUrl: null,
  isAuthenticated: false,
  email: '',
  login: () => {},
  updateProfile: () => {},
  partnerName: '',
  partnerEmail: '',
  weddingDate: '',
  venue: '',
  themeColor: '#aabbcc',
});

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [state, setState] = useState({
    role: 'particular',
    userName: 'Juan y María',
    weddingName: 'Nuestra Boda',
    progress: 50,
    logoUrl: null,
    isAuthenticated: false,
    email: '',
    partnerName: '',
    partnerEmail: '',
    weddingDate: '',
    venue: '',
    themeColor: '#aabbcc',
  });

  const login = (name) => {
    setState((prev) => ({
      ...prev,
      userName: name,
      role: name === 'admin' ? 'admin' : prev.role,
      isAuthenticated: true,
    }));
  };

  const updateProfile = (profile) => {
    setState(prev => ({ ...prev, ...profile }));
  };

  return (
    <UserContext.Provider value={{ ...state, login, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  role: 'particular',
  userName: 'Juan y María',
  weddingName: 'Nuestra Boda',
  progress: 50,
  logoUrl: null,
  isAuthenticated: false,
  login: () => {},
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
  });

  const login = (name) => {
    setState((prev) => ({
      ...prev,
      userName: name,
      role: name === 'admin' ? 'admin' : prev.role,
      isAuthenticated: true,
    }));
  };

  return (
    <UserContext.Provider value={{ ...state, login }}>
      {children}
    </UserContext.Provider>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as fbUpdateProfile,
} from 'firebase/auth';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
});

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const role = userDoc.exists() ? userDoc.data().role : 'particular';
        setUser({ ...firebaseUser, role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    await setDoc(doc(db, 'users', newUser.uid), { role: 'particular', email: newUser.email, createdAt: serverTimestamp() });
    setUser({ ...newUser, role: 'particular' });
    return newUser;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateProfile = async (profile) => {
    if (auth.currentUser) {
      await fbUpdateProfile(auth.currentUser, profile);
      setUser({ ...auth.currentUser, ...profile });
    }
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated: !!user, loading, signup, login, logout, updateProfile }}>
      {!loading && children}
    </UserContext.Provider>
  );
}

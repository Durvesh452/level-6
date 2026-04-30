'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/ui/Toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('trustland_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);


  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const login = (userData) => {
    localStorage.setItem('trustland_user', JSON.stringify(userData));
    setUser(userData);
    addToast("Welcome back!", "success");
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('trustland_user');
    setUser(null);
    addToast("Logged out successfully", "info");
    router.push('/');
  };

  return (
    <AppContext.Provider value={{ user, setUser, addToast, login, logout, isLoading }}>
      {children}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

'use client';
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useApp } from '@/context/AppContext';

const ClientLayout = ({ children }) => {
  const { user, logout, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} logout={logout} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, addToast } = useApp();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('trustland_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.email === email && parsed.password === password) {
        login(parsed);
        return;
      }
    }
    addToast("Invalid email or password", "error");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 flex flex-col justify-center min-h-[70vh]">
      <Card className="shimmer">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black mb-2">Back to Safety</h2>
          <p className="text-muted">Access your land registry dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-muted uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-muted uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full h-14 text-lg">Sign In</Button>
        </form>
        <p className="mt-8 text-center text-muted">
          Don&apos;t have an account? <Link href="/signup" className="text-primary hover:underline font-bold">Sign Up Free</Link>
        </p>
      </Card>
    </div>
  );
}

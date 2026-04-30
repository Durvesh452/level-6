'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';
import { generateKeypair } from '@/lib/stellar';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [keypair, setKeypair] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, addToast } = useApp();

  const handleGenerateWallet = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const pair = generateKeypair();
      setKeypair({
        publicKey: pair.publicKey(),
        secret: pair.secret()
      });
      setStep(2);
      setIsLoading(false);
    }, 1500);
  };

  const completeSignup = () => {
    const newUser = {
      email,
      password,
      publicKey: keypair.publicKey,
      secretKey: keypair.secret,
      joinedAt: new Date().toISOString()
    };
    login(newUser);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied!`, "info");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 flex flex-col justify-center min-h-[70vh]">
      {step === 1 ? (
        <Card>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black mb-2">Create Account</h2>
            <p className="text-muted">Start securing property documents today</p>
          </div>
          <form onSubmit={handleGenerateWallet} className="space-y-6">
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
              <label className="block text-sm font-bold mb-2 text-muted uppercase tracking-wider">Create Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" isLoading={isLoading} className="w-full h-14 text-lg">Generate Blockchain ID</Button>
          </form>
          <p className="mt-8 text-center text-muted">
            Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Sign In</Link>
          </p>
        </Card>
      ) : (
        <Card className="border-t-4 border-t-secondary animate-in zoom-in-95 duration-500">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-secondary/20">
              <Icon name="key" className="text-secondary" />
            </div>
            <h2 className="text-3xl font-black mb-2">Your Stellar Identity</h2>
            <p className="text-muted">This is your unique blockchain keypair. Save it carefully.</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase">Public Address (Safe to Share)</label>
              <div className="flex gap-2">
                <div className="flex-grow bg-background border border-border rounded-xl px-4 py-3 font-mono text-sm break-all">
                  {keypair.publicKey}
                </div>
                <button onClick={() => copyToClipboard(keypair.publicKey, "Public Key")} className="p-3 bg-surface hover:text-primary border border-border rounded-xl transition-colors">
                  <Icon name="copy" size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-danger/5 border border-danger/20 rounded-xl">
              <label className="text-xs font-bold text-danger uppercase flex items-center gap-2">
                <Icon name="alert-triangle" size={14} /> Secret Key (NEVER SHARE)
              </label>
              <div className="flex gap-2">
                <div className="flex-grow bg-background border border-danger/20 rounded-xl px-4 py-3 font-mono text-sm blur-sm hover:blur-none transition-all cursor-help break-all">
                  {keypair.secret}
                </div>
                <button onClick={() => copyToClipboard(keypair.secret, "Secret Key")} className="p-3 bg-surface hover:text-danger border border-border rounded-xl transition-colors">
                  <Icon name="copy" size={20} />
                </button>
              </div>
              <p className="text-[10px] text-danger/70 mt-2 font-medium">WARNING: If you lose this key, you lose access to your documents on-chain. TrustLand cannot recover it.</p>
            </div>

            <Button onClick={completeSignup} className="w-full h-14 text-lg" variant="success">I&apos;ve Saved My Keys - Let&apos;s Go!</Button>
          </div>
        </Card>
      )}
    </div>
  );
}

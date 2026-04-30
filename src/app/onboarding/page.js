'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';

export default function OnboardingPage() {
  const { user, setUser, addToast } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    walletAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initForm = () => {
      if (user) {
        setFormData({
          fullName: user.fullName || '',
          email: user.email || '',
          walletAddress: user.publicKey || ''
        });
      }
    };
    initForm();
  }, [user]);


  const handleOnboarding = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id, // Assuming Supabase Auth ID
          full_name: formData.fullName,
          email: formData.email,
          wallet_address: formData.walletAddress,
          referral_code: referralCode,
          onboarded_at: new Date().toISOString()
        });

      if (error) throw error;

      const updatedUser = { ...user, fullName: formData.fullName, referralCode, isOnboarded: true };
      setUser(updatedUser);
      localStorage.setItem('trustland_user', JSON.stringify(updatedUser));
      
      setStep(3); // Success step
      addToast("Profile completed!", "success");
    } catch (error) {
      console.error(error);
      addToast("Failed to save profile", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-2">Welcome to TrustLand</h1>
        <p className="text-muted">Let&apos;s set up your professional property profile</p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-2 w-16 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-surface'}`}></div>
        ))}
      </div>

      {step === 1 && (
        <Card className="animate-in fade-in slide-in-from-bottom duration-500">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
            <p className="text-muted text-sm">We need this to associate your identity with your documents.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                required
                placeholder="Enter your full name"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Contact Email</label>
              <input 
                type="email" 
                required
                placeholder="email@example.com"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full h-14">Continue</Button>
          </form>
        </Card>
      )}

      {step === 2 && (
        <Card className="animate-in fade-in slide-in-from-right duration-500">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Wallet Confirmation</h2>
            <p className="text-muted text-sm">Verify your public wallet address for on-chain records.</p>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
              <div className="flex gap-4">
                <Icon name="shield-check" className="text-primary" />
                <p className="text-xs text-muted leading-relaxed">This wallet will be used as the legal &quot;Owner ID&quot; for all property registrations on the Stellar blockchain.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Stellar Public Key</label>
              <div className="bg-background border border-border rounded-xl px-4 py-3 font-mono text-xs break-all">
                {formData.walletAddress}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={handleOnboarding} isLoading={isSubmitting} className="flex-[2] h-14">Complete Onboarding</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="text-center p-12 animate-in zoom-in-95 duration-500 border-2 border-secondary bg-secondary/5">
          <div className="w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary/20">
            <Icon name="party-popper" size={40} />
          </div>
          <h2 className="text-3xl font-black mb-4">You&apos;re All Set!</h2>
          <p className="text-muted mb-10 leading-relaxed">
            Welcome to the future of land registry, <span className="text-accent font-bold">{formData.fullName}</span>. Your professional dashboard is ready.
          </p>
          
          <div className="bg-background/50 rounded-2xl p-6 mb-10 border border-border">
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Your Referral Link</p>
            <div className="flex gap-2">
              <div className="flex-grow bg-surface border border-border rounded-xl px-4 py-3 text-sm font-medium text-primary">
                trustland.app/join?ref={user?.referralCode}
              </div>
              <button onClick={() => { navigator.clipboard.writeText(`trustland.app/join?ref=${user?.referralCode}`); addToast("Link copied!", "info") }} className="p-3 bg-primary text-white rounded-xl">
                <Icon name="copy" size={20} />
              </button>
            </div>
            <p className="text-[10px] text-muted mt-4">Invite others to secure their land and earn TrustPoints.</p>
          </div>

          <Button onClick={() => router.push('/dashboard')} className="w-full h-16 text-lg" variant="success">Go to My Dashboard</Button>
        </Card>
      )}
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';
import { registerDocument } from '@/lib/stellar';
import { logTransaction, logEvent } from '@/lib/supabase';

export default function RegisterPage() {
  const { user, addToast } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [hashes, setHashes] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    location: '', 
    surveyId: '', 
    coordinates: '' 
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    
    // Hashing
    const newHashes = await Promise.all(selectedFiles.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }));
    
    setHashes(newHashes);
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    try {
      const result = await registerDocument(user.secretKey, hashes[0], {
        name: formData.name,
        location: formData.location,
        surveyId: formData.surveyId,
      });

      const txData = {
        tx_hash: result.hash,
        user_id: user.id, // Assuming user.id is available from auth
        wallet_address: user.publicKey,
        type: 'registration',
        status: 'success',
        metadata: {
          name: formData.name,
          hash: hashes[0],
          location: formData.location,
          surveyId: formData.surveyId
        }
      };

      await logTransaction(txData);
      await logEvent('document_registered', user.id, { name: formData.name });

      const newDoc = {
        id: `tx-${Date.now()}`,
        name: formData.name,
        hash: hashes[0],
        txId: result.hash,
        location: formData.location,
        surveyId: formData.surveyId,
        coordinates: formData.coordinates,
        timestamp: new Date().toISOString()
      };

      const existingDocs = JSON.parse(localStorage.getItem('trustland_documents') || '[]');
      localStorage.setItem('trustland_documents', JSON.stringify([newDoc, ...existingDocs]));
      
      addToast("Document registered successfully!", "success");
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      addToast("Transaction failed. Ensure your wallet is funded.", "error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6">
          <Icon name="arrow-left" size={20} /> Back
        </button>
        <h1 className="text-4xl font-black mb-2">Register Document</h1>
        <p className="text-muted">Secure your property title on the blockchain</p>
      </div>

      <Card>
        <form onSubmit={handleRegister} className="space-y-8">
          {/* File Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-muted uppercase tracking-wider">Document Files</label>
            <div className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all ${files.length > 0 ? 'border-secondary bg-secondary/5' : 'border-border hover:border-primary/50'}`}>
              <input 
                type="file" 
                multiple
                required
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${files.length > 0 ? 'bg-secondary/20 text-secondary' : 'bg-surface text-muted'}`}>
                  <Icon name={files.length > 0 ? "check" : "upload-cloud"} size={32} />
                </div>
                <p className="font-bold text-lg">{files.length > 0 ? `${files.length} Files Selected` : 'Click or Drag to Upload'}</p>
                <p className="text-muted text-sm mt-1">PDF, JPG, PNG (Max 10MB per file)</p>
              </div>
            </div>
            
            {hashes.length > 0 && (
              <div className="bg-background/50 rounded-xl p-4 border border-border">
                <p className="text-xs font-bold text-muted uppercase mb-3">Generated Hashes</p>
                {hashes.map((h, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-1 border-b border-border/50 last:border-0">
                    <span className="text-xs text-muted truncate">{files[i]?.name}</span>
                    <code className="text-[10px] text-primary font-mono bg-primary/5 px-2 py-0.5 rounded">{h.substring(0, 12)}...</code>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Property Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Oak Valley Estate"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Location / City</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Lagos, Nigeria"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">Survey / Plot ID</label>
              <input 
                type="text" 
                placeholder="e.g. SVY/2026/0452"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                value={formData.surveyId}
                onChange={(e) => setFormData({...formData, surveyId: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-wider">GPS Coordinates (Optional)</label>
              <input 
                type="text" 
                placeholder="6.5244° N, 3.3792° E"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                value={formData.coordinates}
                onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6">
            <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 mb-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Icon name="zap" className="text-secondary" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Gasless Transaction Enabled</h4>
                  <p className="text-xs text-muted leading-relaxed">TrustLand is sponsoring your transaction fees. Your cost: <span className="text-secondary font-black">0 XLM</span>.</p>
                </div>
              </div>
            </div>
            <Button type="submit" isLoading={isLoading} className="w-full h-16 text-lg" icon="shield">Anchoring to Blockchain</Button>

          </div>
        </form>
      </Card>
    </div>
  );
}

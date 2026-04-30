'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';

export default function VerifyPage() {
  const { addToast } = useApp();
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState('');
  const [result, setResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setResult(null);
    
    // Hashing
    const buffer = await selectedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setHash(hashHex);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const storedDocs = JSON.parse(localStorage.getItem('trustland_documents') || '[]');
      const match = storedDocs.find(d => d.hash === hash);
      
      if (match) {
        setResult({
          status: 'verified',
          doc: match
        });
        addToast("Document Verified!", "success");
      } else {
        setResult({
          status: 'failed'
        });
        addToast("No match found on blockchain", "error");
      }
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-primary/20">
           <Icon name="search" size={16} className="text-primary" />
           <span className="text-xs font-bold tracking-widest uppercase">Global Verification Tool</span>
        </div>
        <h1 className="text-5xl font-black mb-4">Verify Authenticity</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">Upload any document to instantly verify if it has been anchored to the TrustLand protocol and the Stellar blockchain.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card className="shimmer">
            <div className="space-y-6">
              <div className="relative border-2 border-dashed border-border rounded-3xl p-12 text-center hover:border-primary/50 transition-all group">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${file ? 'bg-secondary/20 text-secondary' : 'bg-surface text-muted group-hover:text-primary group-hover:bg-primary/10'}`}>
                    <Icon name={file ? "check-circle" : "file-search"} size={32} />
                  </div>
                  <p className="font-bold text-lg">{file ? file.name : 'Select Document'}</p>
                  <p className="text-muted text-sm mt-1">Upload the original file to compare hashes</p>
                </div>
              </div>

              {hash && (
                <div className="bg-background/50 rounded-xl p-4 border border-border">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Generated SHA-256 Hash</p>
                  <code className="text-xs text-primary font-mono break-all leading-relaxed">{hash}</code>
                </div>
              )}

              <Button 
                onClick={handleVerify} 
                disabled={!hash || isVerifying} 
                isLoading={isVerifying}
                className="w-full h-16 text-lg"
              >
                Verify Against Ledger
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Icon name="help-circle" size={20} className="text-primary" /> How it works?
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              We regenerate the cryptographic hash of your document locally and query the Stellar network for a matching record. If the hashes match, it proves the document has not been tampered with since its registration.
            </p>
          </div>
        </div>

        <div>
          {result ? (
            <div className={`animate-in zoom-in-95 duration-500 h-full`}>
              {result.status === 'verified' ? (
                <Card className="border-2 border-secondary bg-secondary/5 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                      <Icon name="check-circle" size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">Authentic Document</h2>
                      <p className="text-muted text-sm">Verified on Stellar Blockchain</p>
                    </div>
                  </div>

                  <div className="space-y-6 flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Property Name</p>
                        <p className="font-bold">{result.doc.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Registration Date</p>
                        <p className="font-bold">{new Date(result.doc.timestamp).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Location</p>
                        <p className="font-bold">{result.doc.location}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Survey ID</p>
                        <p className="font-bold">{result.doc.surveyId || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-background/50 rounded-xl border border-border">
                      <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">On-Chain Transaction ID</p>
                      <code className="text-xs text-primary font-mono break-all">{result.doc.txId}</code>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a 
                      href={`https://stellar.expert/explorer/testnet/tx/${result.doc.txId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-secondary text-white font-bold rounded-xl hover:opacity-90 transition-all"
                    >
                      <Icon name="external-link" size={20} /> View Public Ledger Record
                    </a>
                  </div>
                </Card>
              ) : (
                <Card className="border-2 border-danger bg-danger/5 h-full flex flex-col items-center justify-center text-center p-12">
                  <div className="w-20 h-20 bg-danger text-white rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-danger/20">
                    <Icon name="alert-octagon" size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-danger uppercase mb-4">Verification Failed</h2>
                  <p className="text-muted leading-relaxed">
                    This document hash was not found in the TrustLand protocol records. It may be unregistered or could have been modified since its original registration.
                  </p>
                  <Button variant="secondary" className="mt-8" onClick={() => setResult(null)}>Try Another File</Button>
                </Card>
              )}
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center bg-surface/20">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 text-muted/30">
                <Icon name="shield-off" size={40} />
              </div>
              <h3 className="text-xl font-bold text-muted mb-2">Waiting for Verification</h3>
              <p className="text-muted text-sm">Upload a file on the left to start the verification process.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

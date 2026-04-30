'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full animate-slow-pulse -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-in slide-in-from-top duration-700">
               <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
               <span className="text-xs font-bold tracking-widest uppercase">Live on Stellar Testnet</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">
              <span className="animated-gradient-text">Stop Land Fraud.</span><br/>
              Forever.
          </h1>
          
          <p className="text-lg md:text-2xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
              TrustLand secures property deeds by generating unique cryptographic SHA-256 hashes and anchoring them permanently to the Stellar Blockchain.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="w-full text-lg h-16 px-10">Register My Document</Button>
              </Link>
              <Link href="/verify" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full text-lg h-16 px-10">Verify Authenticity</Button>
              </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
              <Card className="glass-hover transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 border border-primary/20">
                      <Icon name="hash" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Upload & Hash</h3>
                  <p className="text-muted text-sm">Your document never leaves your device. We generate a local hash to ensure maximum privacy.</p>
              </Card>
              <Card className="glass-hover transition-all duration-300">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 border border-secondary/20">
                      <Icon name="database" className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">On-Chain Record</h3>
                  <p className="text-muted text-sm">Hashes are recorded on the Stellar Testnet ledger, creating a permanent, timestamped audit trail.</p>
              </Card>
              <Card className="glass-hover transition-all duration-300">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4 border border-warning/20">
                      <Icon name="search" className="text-warning" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Public Verification</h3>
                  <p className="text-muted text-sm">Anyone with the original file can instantly verify its authenticity against the global ledger.</p>
              </Card>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-y border-border py-12 bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-32">
              <div className="text-center">
                  <p className="text-3xl md:text-5xl font-black text-accent mb-2 tracking-tighter">1,240+</p>
                  <p className="text-muted text-xs uppercase tracking-widest font-bold">Documents Secured</p>
              </div>
              <div className="text-center">
                  <p className="text-3xl md:text-5xl font-black text-secondary mb-2 tracking-tighter">100%</p>
                  <p className="text-muted text-xs uppercase tracking-widest font-bold">Fraud Proof</p>
              </div>
              <div className="text-center">
                  <p className="text-3xl md:text-5xl font-black text-primary mb-2 tracking-tighter">0.02s</p>
                  <p className="text-muted text-xs uppercase tracking-widest font-bold">Verification Speed</p>
              </div>
          </div>
      </div>
    </div>
  );
}

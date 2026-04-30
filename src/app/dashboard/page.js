'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import { useApp } from '@/context/AppContext';
import { server, fundAccount } from '@/lib/stellar';

export default function DashboardPage() {
  const { user, addToast } = useApp();
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFunding, setIsFunding] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const initDashboard = async () => {
      // Load balance
      try {
        const account = await server.loadAccount(user.publicKey);
        const native = account.balances.find(b => b.asset_type === 'native');
        setBalance(native.balance);
      } catch (e) {
        console.log("Account likely not funded yet.");
        setBalance("0.00");
      }

      // Load documents
      const storedDocs = localStorage.getItem('trustland_documents');
      if (storedDocs) {
        setDocuments(JSON.parse(storedDocs));
      } else {
        const dummyDocs = [
          {
            id: "tx-dummy-1",
            name: "Golden Plot Estate - Block A",
            hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            txId: "a57eb0326e2eb9bcca9e42152864ffbc93d6b63ca0ad4294d8cb02ff2cd0d9bf",
            location: "Lekki, Lagos",
            type: "Title Deed",
            timestamp: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        setDocuments(dummyDocs);
        localStorage.setItem('trustland_documents', JSON.stringify(dummyDocs));
      }
      
      setIsLoading(false);
    };

    initDashboard();
  }, [user, router]);


  const handleFundAccount = async () => {
    setIsFunding(true);
    try {
      await fundAccount(user.publicKey);
      addToast("Account funded with 10,000 XLM!", "success");
      // Refresh balance
      setTimeout(async () => {
        const account = await server.loadAccount(user.publicKey);
        const native = account.balances.find(b => b.asset_type === 'native');
        setBalance(native.balance);
      }, 2000);
    } catch (e) {
      addToast("Funding failed. Try again later.", "error");
    } finally {
      setIsFunding(false);
    }
  };

  if (isLoading || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Dashboard</h1>
          <p className="text-muted">Manage your secured property portfolio</p>
        </div>
        <Link href="/register">
          <Button className="h-14 px-8" icon="plus">Register New Document</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="flex items-center gap-6 border-l-4 border-l-primary">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
            <Icon name="file-text" className="text-primary" />
          </div>
          <div>
            <p className="text-2xl font-black">{documents.length}</p>
            <p className="text-muted text-xs uppercase tracking-widest font-bold">Documents</p>
          </div>
        </Card>
        <Card className="flex items-center gap-6 border-l-4 border-l-secondary">
          <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
            <Icon name="wallet" className="text-secondary" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-black">{balance ? parseFloat(balance).toLocaleString() : '0.00'} XLM</p>
              {(!balance || balance === "0.00") && (
                <button 
                  onClick={handleFundAccount} 
                  disabled={isFunding} 
                  className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded hover:bg-secondary/30 transition-all disabled:opacity-50"
                >
                  {isFunding ? '...' : 'Get Funds'}
                </button>
              )}
            </div>
            <p className="text-muted text-xs uppercase tracking-widest font-bold">Wallet Balance</p>
          </div>
        </Card>
        <Card className="flex items-center gap-6 border-l-4 border-l-warning">
          <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center border border-warning/20">
            <Icon name="activity" className="text-warning" />
          </div>
          <div>
            <p className="text-2xl font-black">Testnet</p>
            <p className="text-muted text-xs uppercase tracking-widest font-bold">Network Status</p>
          </div>
        </Card>
      </div>

      {/* Document List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Recent Registrations</h3>
          <div className="text-sm text-muted">Showing {documents.length} entries</div>
        </div>

        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl border-dashed border-2 border-border">
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6">
              <Icon name="file-plus" size={32} className="text-muted/50" />
            </div>
            <p className="text-lg font-bold text-muted mb-6">No documents registered yet</p>
            <Link href="/register">
              <Button variant="secondary">Get Started Now</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {documents.map(doc => (
              <div key={doc.id} className="glass rounded-2xl p-6 glass-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <Icon name="file-text" className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{doc.name}</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted font-medium mt-1">
                      <span className="flex items-center gap-1"><Icon name="map-pin" size={12} /> {doc.location}</span>
                      <span className="flex items-center gap-1"><Icon name="calendar" size={12} /> {new Date(doc.timestamp).toLocaleDateString()}</span>
                      {doc.surveyId && <span className="flex items-center gap-1 text-secondary/80 font-bold"><Icon name="hash" size={12} /> {doc.surveyId}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1 w-full md:w-auto">
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">On-Chain Hash (SHA-256)</p>
                  <div className="px-3 py-2 bg-background/50 rounded-lg border border-border flex items-center justify-between gap-4">
                    <code className="text-xs text-primary font-mono">{doc.hash.substring(0, 16)}...{doc.hash.substring(doc.hash.length - 8)}</code>
                    <button onClick={() => { navigator.clipboard.writeText(doc.hash); addToast("Hash copied!", "info") }}>
                      <Icon name="copy" size={14} className="text-muted hover:text-primary transition-colors" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a 
                    href={`https://stellar.expert/explorer/testnet/tx/${doc.txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-secondary/20 transition-all"
                  >
                    <Icon name="external-link" size={14} /> Explorer
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

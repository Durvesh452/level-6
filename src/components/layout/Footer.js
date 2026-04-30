import React from 'react';
import Icon from '@/components/ui/Icon';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20 py-12 glass">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-60">
          <Icon name="shield-check" size={20} className="text-primary" />
          <span className="font-bold">TrustLand Protocol</span>
        </div>
        <p className="text-muted text-sm px-4 max-w-md mx-auto">
          Securing global land ownership through Immutable SHA-256 Hashes on the Stellar Blockchain.
        </p>
        <div className="mt-8 flex justify-center gap-6 text-muted">
          <a href="#" className="hover:text-primary transition-colors underline underline-offset-4">Stellar Expert</a>
          <a href="#" className="hover:text-primary transition-colors underline underline-offset-4">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors underline underline-offset-4">Github</a>
        </div>
        <p className="mt-12 text-xs text-muted/50">
          &copy; {new Date().getFullYear()} TrustLand. Built for the future of Real Estate.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

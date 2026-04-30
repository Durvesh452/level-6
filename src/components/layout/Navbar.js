'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

const Navbar = ({ user, logout }) => {
  const pathname = usePathname();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Verify', href: '/verify' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Icon name="shield-check" size={24} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">Trust<span className="text-primary font-black">Land</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`font-medium transition-colors hover:text-primary ${isActive(link.href) ? 'text-primary' : 'text-muted'}`}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <>
              <Link 
                href="/dashboard" 
                className={`font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-muted'}`}
              >
                Dashboard
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <Icon name="user" size={16} className="text-primary" />
                </div>
                <Button variant="ghost" className="px-2" onClick={logout}>Logout</Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsSideNavOpen(!isSideNavOpen)} className="p-2 text-muted hover:text-accent transition-colors">
            <Icon name={isSideNavOpen ? "x" : "menu"} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isSideNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden glass mt-20 animate-in fade-in slide-in-from-top duration-300">
           <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsSideNavOpen(false)}
                  className="text-xl font-medium text-left"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsSideNavOpen(false)}
                    className="text-xl font-medium text-left"
                  >
                    My Dashboard
                  </Link>
                  <button onClick={() => { logout(); setIsSideNavOpen(false); }} className="text-xl font-medium text-left text-danger">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsSideNavOpen(false)} className="text-xl font-medium text-left">Login</Link>
                  <Link href="/signup" onClick={() => setIsSideNavOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

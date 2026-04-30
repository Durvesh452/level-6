import React from 'react';
import { cn } from '@/lib/utils';
import Icon from './Icon';

const Button = ({ children, onClick, variant = 'primary', className = "", isLoading = false, disabled = false, icon = null, type = "button" }) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
    secondary: "bg-surface border border-border text-accent hover:border-primary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-muted hover:text-accent hover:bg-surface/50",
    danger: "bg-danger text-white hover:opacity-90",
    success: "bg-secondary text-white hover:opacity-90"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], className)}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        <>
          {icon && <Icon name={icon} size={20} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import Icon from './Icon';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'border-secondary bg-secondary/10 text-secondary',
    error: 'border-danger bg-danger/10 text-danger',
    info: 'border-primary bg-primary/10 text-primary',
    warning: 'border-warning bg-warning/10 text-warning'
  };

  const icons = {
    success: 'check-circle',
    error: 'alert-circle',
    info: 'info',
    warning: 'alert-triangle'
  };

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 glass animate-in slide-in-from-right fade-in duration-300",
      colors[type]
    )}>
      <Icon name={icons[type]} size={20} />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
        <Icon name="x" size={16} />
      </button>
    </div>
  );
};

export default Toast;

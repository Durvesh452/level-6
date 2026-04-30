import React from 'react';
import { cn } from '@/lib/utils';

const Card = ({ children, className = "" }) => (
  <div className={cn("glass rounded-2xl p-6", className)}>
    {children}
  </div>
);

export default Card;

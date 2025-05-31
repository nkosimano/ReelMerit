import React from 'react';
import { Film } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-6 w-6' }) => {
  return (
    <div className={`relative ${className}`}>
      <Film className="text-primary-600 w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-accent-500" />
      </div>
    </div>
  );
};

export default Logo;
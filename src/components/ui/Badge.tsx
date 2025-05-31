import React from 'react';
import { CheckCircle, Clock, AlertCircle, HelpCircle } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  className = '' 
}) => {
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    success: 'badge-success',
    error: 'badge-error',
    warning: 'badge-warning',
  };

  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

interface VerificationBadgeProps {
  status: 'verified' | 'pending' | 'rejected' | 'unverified';
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  status, 
  className = '' 
}) => {
  switch (status) {
    case 'verified':
      return (
        <span className={`verified-badge ${className}`}>
          <CheckCircle className="h-3 w-3" />
          Verified
        </span>
      );
    case 'pending':
      return (
        <span className={`pending-badge ${className}`}>
          <Clock className="h-3 w-3" />
          Pending
        </span>
      );
    case 'rejected':
      return (
        <span className={`rejected-badge ${className}`}>
          <AlertCircle className="h-3 w-3" />
          Rejected
        </span>
      );
    case 'unverified':
    default:
      return (
        <span className={`unverified-badge ${className}`}>
          <HelpCircle className="h-3 w-3" />
          Unverified
        </span>
      );
  }
};
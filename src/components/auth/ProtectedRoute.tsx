import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireMeritPitch?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [],
  requireMeritPitch = false
}) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse-slow text-primary-600 text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required roles
  if (allowedRoles.length > 0 && profile && !allowedRoles.some(role => profile.roles.includes(role))) {
    return <Navigate to="/\" replace />;
  }

  // Check if Merit Pitch is required and not completed
  if (requireMeritPitch && profile?.roles.includes('Candidate') && !profile.hasCompletedMeritPitch) {
    return <Navigate to="/onboarding/merit-pitch" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
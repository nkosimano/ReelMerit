import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
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

  // If roles are specified and the user's role doesn't match, redirect to home
  if (allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/\" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
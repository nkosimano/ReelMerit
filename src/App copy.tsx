import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ShowcasePage from './pages/ShowcasePage';
import VerificationPage from './pages/VerificationPage';
import ChallengesPage from './pages/ChallengesPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import ProfilePage from './pages/ProfilePage';
import VerificationStatusPage from './pages/VerificationStatusPage';
import VerificationQueuePage from './pages/VerificationQueuePage';
import ReelReviewPage from './pages/ReelReviewPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ConfirmEmailPage from './pages/auth/ConfirmEmailPage';
import MeritPitchPage from './pages/onboarding/MeritPitchPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  // Add a timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timer);
  }, []);

  // Show loading state only if we're still loading and haven't timed out
  if (loading && showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse-slow text-primary-600 text-xl font-semibold">
          Loading ReelMerit...
        </div>
      </div>
    );
  }
  
  // If loading timed out but auth is still loading, show a warning but render the app
  if (loading) {
    console.warn('Loading state timed out. Proceeding to show the app.');
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth/confirm-email" element={<ConfirmEmailPage />} />
      <Route 
        path="/onboarding/merit-pitch" 
        element={
          <ProtectedRoute 
            allowedRoles={['Candidate']} 
            requireMeritPitch={false}
          >
            <MeritPitchPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="showcase" element={<ShowcasePage />} />
        <Route path="verification" element={<VerificationPage />} />
        <Route path="challenges" element={<ChallengesPage />} />
        <Route 
          path="employer-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['Employer']}>
              <EmployerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute 
              allowedRoles={['Candidate', 'Professional', 'Employer']}
              requireMeritPitch={true}
            >
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="verification-status" 
          element={
            <ProtectedRoute allowedRoles={['Professional']}>
              <VerificationStatusPage />
            </ProtectedRoute>
          } 
        />
        <Route
          path="verification-queue"
          element={
            <ProtectedRoute allowedRoles={['Professional']}>
              <VerificationQueuePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="verification/:requestId/review"
          element={
            <ProtectedRoute allowedRoles={['Professional']}>
              <ReelReviewPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
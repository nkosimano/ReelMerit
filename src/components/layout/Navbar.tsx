import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Film, UserCheck, Trophy, LayoutDashboard, Menu, X, User } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    const links = [
      { to: '/showcase', text: 'ReelMerit Showcase', icon: <Film className="w-5 h-5" /> },
      { to: '/verification', text: 'Professional Verification', icon: <UserCheck className="w-5 h-5" /> },
      { to: '/challenges', text: 'Video-Based Challenges', icon: <Trophy className="w-5 h-5" /> },
    ];

    // Add role-specific links
    if (profile) {
      if (profile.role === 'Employer') {
        links.push({
          to: '/employer-dashboard',
          text: 'Employer Dashboard',
          icon: <LayoutDashboard className="w-5 h-5" />,
        });
      }

      if (profile.role === 'Candidate') {
        links.push({
          to: '/profile',
          text: 'My Profile / My Reels',
          icon: <User className="w-5 h-5" />,
        });
      }

      if (profile.role === 'Professional') {
        links.push({
          to: '/verification-status',
          text: 'Verification Status',
          icon: <UserCheck className="w-5 h-5" />,
        });
      }
    }

    return links;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">ReelMerit</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {getNavLinks().map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center text-sm font-medium transition-colors hover:text-primary-600 ${
                    isActive ? 'text-primary-600' : 'text-gray-600'
                  }`
                }
              >
                {link.icon}
                <span className="ml-2">{link.text}</span>
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {profile?.role || 'User'}
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline text-sm">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {getNavLinks().map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                  }`
                }
              >
                {link.icon}
                <span className="ml-3">{link.text}</span>
              </NavLink>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <span className="text-sm font-medium text-gray-500">
                    Signed in as: <span className="text-gray-900">{profile?.role || 'User'}</span>
                  </span>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeMobileMenu();
                    }}
                    className="btn btn-outline w-full justify-start"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="btn btn-outline w-full justify-center"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="btn btn-primary w-full justify-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
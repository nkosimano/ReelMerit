import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">ReelMerit</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Skills-first hiring platform that replaces traditional resumes with video Reels.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Candidates</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/showcase" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Create Reels
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Take Challenges
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Manage Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Professionals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/verification" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Get Verified
                </Link>
              </li>
              <li>
                <Link to="/verification-status" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Verification Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/employer-dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Create Challenges
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ReelMerit. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
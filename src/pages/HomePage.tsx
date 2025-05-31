import React from 'react';
import { Link } from 'react-router-dom';
import { Film, UserCheck, Trophy, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Showcase Your Skills, <br />
                <span className="text-primary-600">Not Just Your Resume</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                ReelMerit replaces traditional resumes with video "Reels" that demonstrate your skills in action. Get verified by professionals and stand out to employers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Get Started
                  </Button>
                </Link>
                <Link to="/showcase">
                  <Button size="lg" variant="outline">
                    Browse Showcase
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                {/* This would be a video in the actual implementation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Film className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="verified-badge">Verified Professional</span>
                  <UserCheck className="w-5 h-5 text-success-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How ReelMerit Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform connects skilled candidates with employers through verified video demonstrations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="card p-6 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Video Reels</h3>
              <p className="text-gray-600">
                Upload short videos demonstrating your skills and expertise in action
              </p>
            </motion.div>
            
            <motion.div 
              className="card p-6 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Verified</h3>
              <p className="text-gray-600">
                Professional verification adds credibility to your profile and skills
              </p>
            </motion.div>
            
            <motion.div 
              className="card p-6 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Challenges</h3>
              <p className="text-gray-600">
                Take on employer challenges to showcase your problem-solving abilities
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Showcase Your Skills?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join ReelMerit today and connect with employers looking for your unique talents
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              variant="accent" 
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
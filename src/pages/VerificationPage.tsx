import React from 'react';
import { CheckCircle, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const VerificationPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Professional Verification
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Our verification system establishes trust and credibility by having your skills and credentials validated by experienced professionals in your field.
            </p>
            <div className="flex justify-center">
              <Link to="/verification-status">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Start Verification Process
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefits of Verification
            </h2>
            <p className="text-lg text-gray-600">
              Stand out from the crowd with professional verification
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Establish Credibility</h3>
              <p className="text-gray-600">
                Verification by industry professionals validates your skills and experience
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stand Out to Employers</h3>
              <p className="text-gray-600">
                Verified profiles receive 5x more views and consideration from employers
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Trust</h3>
              <p className="text-gray-600">
                Verification badges create immediate trust with potential employers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Verification Process
            </h2>
            <p className="text-lg text-gray-600">
              Our thorough but streamlined verification process
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              
              {/* Step 1 */}
              <div className="relative mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center z-10">
                    1
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 ml-0">
                  <h3 className="text-xl font-semibold mb-2 text-center">Submit Your Application</h3>
                  <p className="text-gray-600 text-center">
                    Complete a comprehensive form detailing your expertise, professional experience, and skills you want to be verified for.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center z-10">
                    2
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 ml-0">
                  <h3 className="text-xl font-semibold mb-2 text-center">Provide Documentation</h3>
                  <p className="text-gray-600 text-center">
                    Upload supporting documents, credentials, certificates, and portfolio links that demonstrate your expertise.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center z-10">
                    3
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 ml-0">
                  <h3 className="text-xl font-semibold mb-2 text-center">Professional Review</h3>
                  <p className="text-gray-600 text-center">
                    Our team of industry professionals reviews your application and verifies your skills and credentials.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center z-10">
                    4
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 ml-0">
                  <h3 className="text-xl font-semibold mb-2 text-center">Receive Verification</h3>
                  <p className="text-gray-600 text-center">
                    Upon approval, your profile receives a verification badge, increasing your visibility and credibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Verified?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Stand out to employers and establish your professional credibility
          </p>
          <Link to="/verification-status">
            <Button 
              variant="accent" 
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              Start Verification Process
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default VerificationPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { VerificationBadge } from '../components/ui/Badge';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Upload, 
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';

const VerificationStatusPage: React.FC = () => {
  const [verificationStatus] = useState<'unverified' | 'pending' | 'verified' | 'rejected'>('unverified');
  const [formStep, setFormStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  
  const startVerification = () => {
    setShowForm(true);
    setFormStep(0);
  };
  
  const nextStep = () => {
    setFormStep((prev) => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 0));
  };
  
  const submitForm = () => {
    // Submit verification request logic would go here
    setShowForm(false);
    // In a real implementation, we would update the verification status to 'pending'
  };
  
  // Form steps component
  const VerificationForm = () => {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Verification Application</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[0, 1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      formStep >= step 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {formStep > step ? <Check className="w-5 h-5" /> : step + 1}
                  </div>
                  <span className="text-xs mt-1 text-gray-500">
                    {step === 0 && 'Expertise'}
                    {step === 1 && 'Documents'}
                    {step === 2 && 'Portfolio'}
                    {step === 3 && 'Review'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              <div className={`h-1 ${formStep >= 1 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              <div className={`h-1 ${formStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              <div className={`h-1 ${formStep >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            </div>
          </div>
          
          {/* Step 1: Expertise */}
          {formStep === 0 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="expertise-area" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Area of Expertise
                </label>
                <select id="expertise-area" className="select w-full">
                  <option value="">Select your primary expertise</option>
                  <option>Frontend Development</option>
                  <option>Backend Development</option>
                  <option>UI/UX Design</option>
                  <option>Data Science</option>
                  <option>DevOps</option>
                  <option>Product Management</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="years-experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Professional Experience
                </label>
                <select id="years-experience" className="select w-full">
                  <option value="">Select years of experience</option>
                  <option>1-2 years</option>
                  <option>3-5 years</option>
                  <option>6-9 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="assertion" className="block text-sm font-medium text-gray-700 mb-1">
                  Assertion of Expertise
                </label>
                <textarea
                  id="assertion"
                  rows={5}
                  className="textarea w-full"
                  placeholder="Provide a detailed description of your expertise, including specific skills, notable projects, and areas of specialization."
                ></textarea>
              </div>
            </div>
          )}
          
          {/* Step 2: Documents */}
          {formStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Supporting Documents
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Please provide documents that verify your expertise, such as certifications, diplomas, or letters of recommendation.
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Drag and drop files here
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    PDF, JPG or PNG format, maximum 10MB per file
                  </p>
                  <Button variant="outline" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
                    Select Files
                  </Button>
                </div>
              </div>
              
              <div>
                <label htmlFor="document-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Document Description
                </label>
                <textarea
                  id="document-description"
                  rows={3}
                  className="textarea w-full"
                  placeholder="Briefly describe the documents you've uploaded and how they support your expertise claim."
                ></textarea>
              </div>
            </div>
          )}
          
          {/* Step 3: Portfolio */}
          {formStep === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="portfolio-link" className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio URL
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    id="portfolio-link"
                    className="input rounded-none rounded-r-md w-full"
                    placeholder="https://your-portfolio-website.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="github-link" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub/GitLab URL (Optional)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    id="github-link"
                    className="input rounded-none rounded-r-md w-full"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="linkedin-link" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn URL (Optional)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    id="linkedin-link"
                    className="input rounded-none rounded-r-md w-full"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="portfolio-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio Description
                </label>
                <textarea
                  id="portfolio-description"
                  rows={3}
                  className="textarea w-full"
                  placeholder="Describe key projects or achievements in your portfolio that demonstrate your expertise."
                ></textarea>
              </div>
            </div>
          )}
          
          {/* Step 4: Review */}
          {formStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Review Your Application</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Please review all information before submitting. Once submitted, your application will be reviewed by our verification team.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Expertise</h4>
                    <p className="text-sm text-gray-900">Frontend Development • 3-5 years</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Documents</h4>
                    <p className="text-sm text-gray-900">2 files uploaded</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Portfolio</h4>
                    <p className="text-sm text-gray-900">https://your-portfolio-website.com</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I confirm that all information provided is accurate and complete. I understand that false information may result in rejection or revocation of verification status.
                </label>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            {formStep > 0 ? (
              <Button 
                variant="outline" 
                onClick={prevStep}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Previous
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            )}
            
            {formStep < 3 ? (
              <Button 
                variant="primary" 
                onClick={nextStep}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next
              </Button>
            ) : (
              <Button 
                variant="primary" 
                onClick={submitForm}
                rightIcon={<Check className="w-4 h-4" />}
              >
                Submit Application
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Status component based on verification status
  const VerificationStatusCard = () => {
    switch (verificationStatus) {
      case 'pending':
        return (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-warning-100 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-warning-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification In Progress</h2>
                <p className="text-gray-600 mb-4 max-w-md">
                  Your verification request is currently being reviewed by our team. This process typically takes 2-3 business days.
                </p>
                <VerificationBadge status="pending" />
                
                <div className="mt-6 w-full max-w-md">
                  <div className="bg-gray-100 rounded-full h-2.5">
                    <div className="bg-warning-500 h-2.5 rounded-full w-1/2"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Submitted</span>
                    <span>Under Review</span>
                    <span>Completed</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-6">
                  Submitted on April 15, 2025
                </p>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'verified':
        return (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Complete</h2>
                <p className="text-gray-600 mb-4 max-w-md">
                  Congratulations! Your professional credentials have been verified. Your profile now displays a verification badge.
                </p>
                <VerificationBadge status="verified" />
                
                <div className="mt-6 w-full max-w-md">
                  <div className="bg-gray-100 rounded-full h-2.5">
                    <div className="bg-success-500 h-2.5 rounded-full w-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Submitted</span>
                    <span>Under Review</span>
                    <span>Completed</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" leftIcon={<FileText className="w-4 h-4" />}>
                    View Verification Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'rejected':
        return (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-error-100 flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-error-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Not Approved</h2>
                <p className="text-gray-600 mb-4 max-w-md">
                  Unfortunately, we couldn't verify your professional credentials with the information provided. Please review the feedback below.
                </p>
                <VerificationBadge status="rejected" />
                
                <div className="mt-6 w-full max-w-md bg-error-50 border border-error-200 rounded-lg p-4 text-left">
                  <h3 className="font-medium text-error-800 mb-2">Feedback from our team:</h3>
                  <p className="text-sm text-error-700">
                    We were unable to verify your professional experience based on the documentation provided. Please submit additional proof of your work experience or certifications.
                  </p>
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="primary" 
                    onClick={startVerification}
                    leftIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Submit New Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'unverified':
      default:
        return (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <UserCheck className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Not Yet Verified</h2>
                <p className="text-gray-600 mb-4 max-w-md">
                  Professional verification increases your credibility and visibility to employers. Start the verification process to stand out.
                </p>
                <VerificationBadge status="unverified" />
                
                <div className="mt-6">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={startVerification}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Start Verification Process
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Status</h1>
        <p className="text-gray-600">
          Track and manage your professional verification status
        </p>
      </div>

      {showForm ? (
        <VerificationForm />
      ) : (
        <VerificationStatusCard />
      )}

      {!showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Benefits of Professional Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Increased Credibility</h3>
                <p className="text-sm text-gray-600">
                  Stand out with a verified badge that signals your expertise has been professionally validated
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                  <Visibility className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enhanced Visibility</h3>
                <p className="text-sm text-gray-600">
                  Verified professionals receive 5x more profile views and appear higher in employer searches
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Better Opportunities</h3>
                <p className="text-sm text-gray-600">
                  Many employers filter for verified professionals when looking for high-quality candidates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const UserCheck = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const Visibility = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default VerificationStatusPage;
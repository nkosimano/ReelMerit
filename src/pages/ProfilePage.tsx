import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Badge, VerificationBadge } from '../components/ui/Badge';
import MeritBadgeIcon from '../components/ui/MeritBadgeIcon';
import MeritBadgeModal from '../components/modals/MeritBadgeModal';
import VerificationRequestModal from '../components/modals/VerificationRequestModal';
import { Film, User, Plus, Edit, Upload, Trash2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Reel {
  id: string;
  title: string;
  description: string;
  skills: string[];
  videoUrl: string;
  createdAt: string;
  verificationStatus?: 'unverified' | 'pending' | 'verified' | 'rejected';
  verificationFeedback?: string;
  meritBadge?: {
    id: string;
    professional: {
      name: string;
      title: string;
      expertise: string[];
    };
    awardedAt: string;
    videoStatement: string;
    rubricScores: {
      clarity: number;
      technicalAccuracy: number;
      efficiency: number;
    };
  };
}

const ProfilePage: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showMeritBadgeModal, setShowMeritBadgeModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  useEffect(() => {
    if (profile?.role === 'Candidate') {
      setActiveTab('reels');
      fetchReels();
    }
  }, [profile]);

  const fetchReels = async () => {
    try {
      const { data: reelsData, error: reelsError } = await supabase
        .from('reels')
        .select('*')
        .eq('user_id', profile?.id);

      if (reelsError) throw reelsError;

      const reelsWithStatus = await Promise.all(
        reelsData.map(async (reel) => {
          const { data: verificationData } = await supabase
            .from('skill_verification_requests')
            .select('*')
            .eq('reel_id', reel.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          const { data: meritBadgeData } = await supabase
            .from('merit_badges')
            .select(`
              id,
              professional:professional_id (
                name,
                title,
                expertise
              ),
              awarded_at,
              video_statement,
              rubric_scores
            `)
            .eq('reel_id', reel.id)
            .single();

          return {
            ...reel,
            verificationStatus: verificationData?.status || 'unverified',
            verificationFeedback: verificationData?.feedback,
            meritBadge: meritBadgeData,
          };
        })
      );

      setReels(reelsWithStatus);
    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationRequest = (reel: Reel) => {
    setSelectedReel(reel);
    setShowVerificationModal(true);
  };

  const handleShowMeritBadge = (reel: Reel) => {
    setSelectedReel(reel);
    setShowMeritBadgeModal(true);
  };

  const handleShowFeedback = (reel: Reel) => {
    setSelectedReel(reel);
    setShowFeedbackModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">
          Manage your profile, reels, and credentials
        </p>
      </div>

      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`${
              activeTab === 'profile'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <User className="w-5 h-5 mr-2" />
            Profile Info
          </button>
          
          {profile?.role === 'Candidate' && (
            <button
              onClick={() => setActiveTab('reels')}
              className={`${
                activeTab === 'reels'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Film className="w-5 h-5 mr-2" />
              My Reels
            </button>
          )}
        </nav>
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {profile?.name || 'Your Name'}
                </h2>
                
                <p className="text-gray-500 mb-2">{profile?.email}</p>
                
                {profile?.role && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {profile.role}
                    </span>
                  </div>
                )}
                
                {profile?.role === 'Professional' && (
                  <div className="mb-4">
                    <VerificationBadge status="pending" />
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit className="w-4 h-4" />}
                  className="mt-2"
                >
                  Edit Profile
                </Button>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Role Information</h3>
                
                {profile?.role === 'Candidate' && (
                  <div className="text-sm text-gray-600">
                    <p className="mb-4">
                      As a candidate, you can create video reels to showcase your skills and participate in challenges.
                    </p>
                    <div className="flex justify-center">
                      <Link to="/challenges">
                        <Button size="sm" variant="secondary">
                          Browse Challenges
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
                
                {profile?.role === 'Professional' && (
                  <div className="text-sm text-gray-600">
                    <p className="mb-4">
                      As a professional, you can verify candidates and add credibility to their profiles.
                    </p>
                    <div className="flex justify-center">
                      <Link to="/verification-status">
                        <Button size="sm" variant="secondary">
                          Verification Status
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
                
                {profile?.role === 'Employer' && (
                  <div className="text-sm text-gray-600">
                    <p className="mb-4">
                      As an employer, you can create challenges and discover skilled candidates.
                    </p>
                    <div className="flex justify-center">
                      <Link to="/employer-dashboard">
                        <Button size="sm" variant="secondary">
                          Go to Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="input w-full"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="input w-full"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="textarea w-full"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>
                
                {profile?.role === 'Candidate' && (
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      className="input w-full"
                      placeholder="React, JavaScript, UI Design, etc."
                    />
                  </div>
                )}
                
                {profile?.role === 'Professional' && (
                  <div>
                    <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                      Areas of Expertise (comma separated)
                    </label>
                    <input
                      type="text"
                      id="expertise"
                      className="input w-full"
                      placeholder="Frontend Development, UI Design, etc."
                    />
                  </div>
                )}
                
                {profile?.role === 'Employer' && (
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="input w-full"
                      placeholder="Your company name"
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="input w-full"
                    placeholder="City, Country"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="primary">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'reels' && profile?.role === 'Candidate' && (
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload New Reel</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="input w-full"
                    placeholder="Give your reel a descriptive title"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="textarea w-full"
                    placeholder="Describe what you're demonstrating in this reel"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Skills Demonstrated (comma separated)
                  </label>
                  <input
                    type="text"
                    id="skills"
                    className="input w-full"
                    placeholder="React, JavaScript, UI Design, etc."
                  />
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Drag and drop your video file
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    MP4, MOV or WebM format, maximum 100MB
                  </p>
                  <Button variant="outline" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
                    Select File
                  </Button>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="primary" leftIcon={<Film className="w-5 h-5" />}>
                    Upload Reel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Reels</h2>
              <Button variant="outline" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                New Reel
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reels.map((reel) => (
                <Card key={reel.id}>
                  <div className="aspect-video bg-gray-200 rounded-t-lg relative flex items-center justify-center">
                    <Film className="w-12 h-12 text-gray-400" />
                    <button className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity rounded-t-lg">
                      <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>

                    {reel.meritBadge && (
                      <div className="absolute top-2 right-2">
                        <MeritBadgeIcon 
                          onClick={() => handleShowMeritBadge(reel)}
                          className="bg-white rounded-full p-2 shadow-md"
                        />
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{reel.title}</h3>
                    
                    <div className="mb-4 flex flex-wrap gap-1">
                      {reel.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      {reel.verificationStatus === 'verified' ? (
                        <VerificationBadge status="verified" />
                      ) : reel.verificationStatus === 'pending' ? (
                        <Badge variant="warning">Verification Pending</Badge>
                      ) : reel.verificationStatus === 'rejected' ? (
                        <button
                          onClick={() => handleShowFeedback(reel)}
                          className="flex items-center text-error-600 text-sm hover:text-error-700"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          View Feedback
                        </button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleVerificationRequest(reel)}
                        >
                          Request Verification
                        </Button>
                      )}

                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-500 hover:text-primary-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-error-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-6 h-full">
                <Plus className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm font-medium text-gray-900 mb-4 text-center">
                  Create a new reel to showcase your skills
                </p>
                <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Add New Reel
                </Button>
              </Card>
            </div>
          </div>

          {selectedReel && (
            <>
              <VerificationRequestModal
                isOpen={showVerificationModal}
                onClose={() => setShowVerificationModal(false)}
                reelId={selectedReel.id}
                skills={selectedReel.skills}
              />

              <MeritBadgeModal
                isOpen={showMeritBadgeModal}
                onClose={() => setShowMeritBadgeModal(false)}
                meritBadge={selectedReel.meritBadge}
              />

              {showFeedbackModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
                    <h3 className="text-xl font-semibold mb-4">Verification Feedback</h3>
                    <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6">
                      <p className="text-error-700">{selectedReel.verificationFeedback}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="primary" onClick={() => setShowFeedbackModal(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { VerificationBadge } from '../components/ui/Badge';
import MeritBadgeIcon from '../components/ui/MeritBadgeIcon';
import MeritBadgeModal from '../components/modals/MeritBadgeModal';
import { Film, ThumbsUp, Share2 } from 'lucide-react';

const ShowcasePage: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  // Placeholder reels data with merit badges
  const reels = [
    {
      id: 1,
      title: 'Frontend Development with React',
      username: 'Sarah Johnson',
      verificationStatus: 'verified' as const,
      skills: ['React', 'JavaScript', 'Tailwind CSS'],
      likes: 128,
      shares: 45,
      meritBadge: {
        id: 'mb1',
        professional: {
          name: 'John Expert',
          title: 'Senior Frontend Developer',
          expertise: ['React', 'JavaScript', 'Web Development'],
        },
        awardedAt: '2025-03-15T10:00:00Z',
        videoStatement: 'https://example.com/video1.mp4',
        rubricScores: {
          clarity: 5,
          technicalAccuracy: 4,
          efficiency: 5,
        },
      },
    },
    {
      id: 2,
      title: 'UX Design Principles',
      username: 'David Chen',
      verificationStatus: 'verified' as const,
      skills: ['UI Design', 'Figma', 'User Research'],
      likes: 87,
      shares: 32,
    },
    {
      id: 3,
      title: 'Database Optimization',
      username: 'Miguel Rodriguez',
      verificationStatus: 'pending' as const,
      skills: ['SQL', 'PostgreSQL', 'Performance Tuning'],
      likes: 64,
      shares: 21,
    },
    {
      id: 4,
      title: 'Cloud Architecture',
      username: 'Alex Taylor',
      verificationStatus: 'unverified' as const,
      skills: ['AWS', 'Infrastructure', 'Terraform'],
      likes: 42,
      shares: 15,
    },
    {
      id: 5,
      title: 'Mobile App Development',
      username: 'Priya Patel',
      verificationStatus: 'verified' as const,
      skills: ['React Native', 'iOS', 'Android'],
      likes: 96,
      shares: 28,
    },
    {
      id: 6,
      title: 'Data Visualization',
      username: 'Thomas Wilson',
      verificationStatus: 'pending' as const,
      skills: ['D3.js', 'Chart.js', 'Analytics'],
      likes: 73,
      shares: 19,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ReelMerit Showcase</h1>
        <p className="text-gray-600">
          Discover talented professionals demonstrating their skills through video Reels
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-64 lg:w-72">
          <Card>
            <CardHeader>
              <CardTitle>Filter Reels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by keyword"
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <select id="skills" className="select w-full">
                    <option value="">All Skills</option>
                    <option>React</option>
                    <option>JavaScript</option>
                    <option>UI Design</option>
                    <option>SQL</option>
                    <option>AWS</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Verified Only</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Include Pending</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Include Unverified</span>
                    </label>
                  </div>
                </div>
                
                <button className="btn btn-primary w-full">
                  Apply Filters
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reels.map((reel) => (
              <Card key={reel.id} className="h-full flex flex-col">
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
                        onClick={() => setSelectedBadge(reel.meritBadge)}
                        className="bg-white rounded-full p-2 shadow-md"
                      />
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{reel.title}</h3>
                    <VerificationBadge status={reel.verificationStatus} />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    by {reel.username}
                  </p>
                  
                  <div className="mb-4 flex-1">
                    <div className="flex flex-wrap gap-1">
                      {reel.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="badge badge-secondary text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      {reel.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                      {reel.shares}
                    </button>
                    <button className="text-primary-600 hover:text-primary-700 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Merit Badge Modal */}
      <MeritBadgeModal
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
        meritBadge={selectedBadge}
      />
    </div>
  );
};

export default ShowcasePage;
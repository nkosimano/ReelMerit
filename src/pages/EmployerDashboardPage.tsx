import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { VerificationBadge } from '../components/ui/Badge';
import { Search, Plus, Filter, FileText, Users, Trophy, Film, BarChart, User } from 'lucide-react';

const EmployerDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Placeholder data
  const stats = [
    { id: 1, name: 'Active Challenges', value: 8, icon: <Trophy className="w-5 h-5" /> },
    { id: 2, name: 'Challenge Submissions', value: 64, icon: <FileText className="w-5 h-5" /> },
    { id: 3, name: 'Candidate Interviews', value: 12, icon: <User className="w-5 h-5" /> },
    { id: 4, name: 'Saved Candidates', value: 35, icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
        <p className="text-gray-600">
          Manage your challenges, review submissions, and find skilled candidates
        </p>
      </div>

      {/* Dashboard Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <BarChart className="w-5 h-5 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`${
              activeTab === 'challenges'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Trophy className="w-5 h-5 mr-2" />
            Challenges
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`${
              activeTab === 'submissions'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FileText className="w-5 h-5 mr-2" />
            Submissions
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`${
              activeTab === 'candidates'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Users className="w-5 h-5 mr-2" />
            Find Candidates
          </button>
        </nav>
      </div>

      {/* Dashboard Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.id}>
                <CardContent className="p-6 flex items-center">
                  <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New submission for "Frontend Development Challenge"</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Sarah Johnson accepted your interview invitation</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Your challenge "API Integration Challenge" is now live</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary-50 border-primary-100">
              <CardContent className="p-6">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mb-4 inline-block">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Challenge</h3>
                <p className="text-gray-600 mb-4">
                  Create a new challenge to find candidates with specific skills
                </p>
                <Button variant="primary">Create Challenge</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary-50 border-secondary-100">
              <CardContent className="p-6">
                <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mb-4 inline-block">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Candidates</h3>
                <p className="text-gray-600 mb-4">
                  Find candidates based on skills, verification status, and more
                </p>
                <Button variant="secondary">Search Now</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-accent-50 border-accent-100">
              <CardContent className="p-6">
                <div className="p-3 rounded-full bg-accent-100 text-accent-600 mb-4 inline-block">
                  <Film className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Reels</h3>
                <p className="text-gray-600 mb-4">
                  Discover talented candidates through their video demonstrations
                </p>
                <Button variant="accent">Browse Reels</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'candidates' && (
        <div>
          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search candidates by name, skills, or keywords"
                    className="input pl-10 w-full"
                  />
                </div>
                <Button variant="outline" leftIcon={<Filter className="w-5 h-5" />}>
                  Filters
                </Button>
                <Button variant="primary">Search</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <select className="select w-full">
                    <option value="">All Skills</option>
                    <option>React</option>
                    <option>Node.js</option>
                    <option>UI/UX Design</option>
                    <option>Python</option>
                    <option>Database</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Status
                  </label>
                  <select className="select w-full">
                    <option value="">Any Status</option>
                    <option>Verified Only</option>
                    <option>Pending Verification</option>
                    <option>Unverified</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select className="select w-full">
                    <option>Most Relevant</option>
                    <option>Recently Active</option>
                    <option>Most Verified Skills</option>
                    <option>Most Challenge Completions</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candidate Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Candidate Card 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                    <div className="flex items-center">
                      <VerificationBadge status="verified" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="badge badge-primary">React</span>
                    <span className="badge badge-primary">JavaScript</span>
                    <span className="badge badge-primary">Tailwind CSS</span>
                    <span className="badge badge-primary">UI Design</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Challenges Completed</h4>
                  <p className="text-gray-900">8 challenges</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="primary" fullWidth>View Profile</Button>
                  <Button variant="outline" fullWidth>Contact</Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Candidate Card 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">David Chen</h3>
                    <div className="flex items-center">
                      <VerificationBadge status="verified" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="badge badge-primary">UI Design</span>
                    <span className="badge badge-primary">Figma</span>
                    <span className="badge badge-primary">User Research</span>
                    <span className="badge badge-primary">Prototyping</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Challenges Completed</h4>
                  <p className="text-gray-900">5 challenges</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="primary" fullWidth>View Profile</Button>
                  <Button variant="outline" fullWidth>Contact</Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Candidate Card 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Miguel Rodriguez</h3>
                    <div className="flex items-center">
                      <VerificationBadge status="pending" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="badge badge-primary">SQL</span>
                    <span className="badge badge-primary">PostgreSQL</span>
                    <span className="badge badge-primary">Performance Tuning</span>
                    <span className="badge badge-primary">Database Design</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Challenges Completed</h4>
                  <p className="text-gray-900">3 challenges</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="primary" fullWidth>View Profile</Button>
                  <Button variant="outline" fullWidth>Contact</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboardPage;
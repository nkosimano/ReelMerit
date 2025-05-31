import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Trophy, Calendar, Users, Clock, Building, ArrowRight } from 'lucide-react';

const ChallengesPage: React.FC = () => {
  // Placeholder challenges data
  const challenges = [
    {
      id: 1,
      title: 'Frontend Development Challenge',
      company: 'TechSolutions Inc.',
      description: 'Build a responsive dashboard with React and Tailwind CSS',
      deadline: '2025-05-15',
      participants: 24,
      timeEstimate: '4-6 hours',
      tags: ['React', 'Tailwind CSS', 'Frontend'],
    },
    {
      id: 2,
      title: 'API Integration Challenge',
      company: 'DataFlow Systems',
      description: 'Create a Node.js service that integrates with a REST API',
      deadline: '2025-05-20',
      participants: 18,
      timeEstimate: '3-5 hours',
      tags: ['Node.js', 'REST API', 'Backend'],
    },
    {
      id: 3,
      title: 'UX Design Challenge',
      company: 'CreativeMinds Agency',
      description: 'Design an intuitive onboarding flow for a mobile banking app',
      deadline: '2025-05-25',
      participants: 31,
      timeEstimate: '5-8 hours',
      tags: ['UI/UX', 'Mobile', 'Design'],
    },
    {
      id: 4,
      title: 'Database Optimization',
      company: 'DataSphere Analytics',
      description: 'Optimize a PostgreSQL database for performance and scalability',
      deadline: '2025-06-01',
      participants: 15,
      timeEstimate: '4-7 hours',
      tags: ['PostgreSQL', 'Database', 'Performance'],
    },
    {
      id: 5,
      title: 'Cloud Architecture Challenge',
      company: 'CloudNative Systems',
      description: 'Design a scalable microservices architecture on AWS',
      deadline: '2025-06-05',
      participants: 22,
      timeEstimate: '6-8 hours',
      tags: ['AWS', 'Microservices', 'Cloud'],
    },
    {
      id: 6,
      title: 'Mobile App Feature',
      company: 'AppWorks Studio',
      description: 'Implement a social sharing feature for a React Native app',
      deadline: '2025-06-10',
      participants: 27,
      timeEstimate: '5-7 hours',
      tags: ['React Native', 'Mobile', 'Social'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video-Based Challenges</h1>
        <p className="text-gray-600">
          Showcase your skills by taking on real-world challenges from employers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-6 h-6 text-accent-500" />
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{challenge.timeEstimate}</span>
                </div>
              </div>
              <CardTitle className="text-xl">{challenge.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Building className="w-4 h-4 mr-1" />
                {challenge.company}
              </div>
            </CardHeader>
            
            <CardContent className="flex-1">
              <p className="text-gray-600 mb-4">
                {challenge.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {challenge.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    Due: {new Date(challenge.deadline).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {challenge.participants} participants
                  </span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-gray-100 pt-4">
              <Link to={`/challenges/${challenge.id}`} className="w-full">
                <Button 
                  variant="primary" 
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View Challenge
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Challenges
        </Button>
      </div>
    </div>
  );
};

export default ChallengesPage;
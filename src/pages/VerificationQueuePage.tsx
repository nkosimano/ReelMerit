import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Clock, CheckCircle, XCircle } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';

interface VerificationRequest {
  id: string;
  reel: {
    id: string;
    title: string;
    skills: string[];
    videoUrl: string;
  };
  candidate: {
    name: string;
    email: string;
  };
  createdAt: string;
}

const VerificationQueuePage: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVerificationRequests();
  }, []);

  const fetchVerificationRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('skill_verification_requests')
        .select(`
          id,
          reel:reel_id (
            id,
            title,
            skills,
            video_url
          ),
          candidate:candidate_id (
            name,
            email
          ),
          created_at
        `)
        .eq('status', 'pending')
        .eq('professional_id', supabase.auth.user()?.id);

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching verification requests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Verification Queue
        </h1>
        <p className="text-gray-600">
          Review and verify candidate skill demonstrations
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : requests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Pending Requests
            </h2>
            <p className="text-gray-600">
              You're all caught up! Check back later for new verification requests.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-t-lg relative">
                <Film className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-gray-400" />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                  <Button variant="primary">Watch Reel</Button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {request.reel.title}
                </h3>

                <div className="flex flex-wrap gap-1 mb-4">
                  {request.reel.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  Requested {new Date(request.createdAt).toLocaleDateString()}
                </div>

                <div className="flex justify-between gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/verification/${request.id}/review`)}
                  >
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerificationQueuePage;
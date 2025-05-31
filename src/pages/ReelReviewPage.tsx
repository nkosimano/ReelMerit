import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Award, Video, X } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';

interface RubricScore {
  clarity: number;
  technicalAccuracy: number;
  efficiency: number;
}

const ReelReviewPage: React.FC = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(false);
  const [videoStatement, setVideoStatement] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [request, setRequest] = useState<any>(null);
  const [scores, setScores] = useState<RubricScore>({
    clarity: 0,
    technicalAccuracy: 0,
    efficiency: 0,
  });
  const [feedback, setFeedback] = useState('');
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, [requestId]);

  const fetchRequest = async () => {
    try {
      const { data, error } = await supabase
        .from('skill_verification_requests')
        .select(`
          *,
          reel:reel_id (
            id,
            title,
            description,
            skills,
            video_url
          ),
          candidate:candidate_id (
            name,
            email
          )
        `)
        .eq('id', requestId)
        .single();

      if (error) throw error;
      setRequest(data);
    } catch (error) {
      console.error('Error fetching request:', error);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoStatement(url);
        
        // Here you would typically upload the blob to your storage
        // and get back a permanent URL to store in the database
      };

      setMediaRecorder(recorder);
      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleAwardBadge = async () => {
    if (!videoStatement) return;

    try {
      // First, upload the video statement and get the URL
      // Then create the merit badge record
      const { error } = await supabase
        .from('merit_badges')
        .insert([
          {
            reel_id: request.reel.id,
            professional_id: supabase.auth.user()?.id,
            rubric_scores: scores,
            video_statement_url: videoStatement, // Use the actual uploaded URL
          }
        ]);

      if (error) throw error;

      // Update the verification request status
      await supabase
        .from('skill_verification_requests')
        .update({ status: 'approved' })
        .eq('id', requestId);

      navigate('/verification-queue');
    } catch (error) {
      console.error('Error awarding merit badge:', error);
    }
  };

  const handleDecline = async () => {
    try {
      await supabase
        .from('skill_verification_requests')
        .update({
          status: 'rejected',
          feedback
        })
        .eq('id', requestId);

      navigate('/verification-queue');
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Skill Verification Review
          </h1>
          <p className="text-gray-600">
            Review the candidate's skill demonstration and provide your assessment
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Skill Reel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg mb-4">
              <video
                src={request.reel.video_url}
                controls
                className="w-full h-full rounded-lg"
              />
            </div>
            
            <h2 className="text-xl font-semibold mb-2">{request.reel.title}</h2>
            <p className="text-gray-600 mb-4">{request.reel.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {request.reel.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Verification Rubric</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(scores).map(([criterion, score]) => (
                <div key={criterion}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {criterion.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => setScores({ ...scores, [criterion]: value })}
                        className={`p-2 rounded-full transition-colors ${
                          score >= value
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-300 hover:text-gray-400'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Video Statement</CardTitle>
          </CardHeader>
          <CardContent>
            {!videoStatement ? (
              <div className="text-center py-8">
                {recording ? (
                  <div>
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-gray-600 mb-4">Recording in progress...</p>
                    <Button
                      variant="primary"
                      onClick={stopRecording}
                      leftIcon={<X className="w-4 h-4" />}
                    >
                      Stop Recording
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Record a brief video statement explaining your verification decision
                    </p>
                    <Button
                      variant="primary"
                      onClick={startRecording}
                      leftIcon={<Video className="w-4 h-4" />}
                    >
                      Start Recording
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <video
                  src={videoStatement}
                  controls
                  className="w-full rounded-lg mb-4"
                />
                <Button
                  variant="outline"
                  onClick={() => setVideoStatement(null)}
                  className="w-full"
                >
                  Record Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setShowDeclineModal(true)}
            leftIcon={<X className="w-4 h-4" />}
          >
            Decline
          </Button>
          <Button
            variant="primary"
            onClick={handleAwardBadge}
            disabled={!videoStatement}
            leftIcon={<Award className="w-4 h-4" />}
          >
            Award Merit Badge
          </Button>
        </div>
      </div>

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full mx-4 p-6">
            <h3 className="text-xl font-semibold mb-4">Decline Verification</h3>
            <p className="text-gray-600 mb-4">
              Please provide constructive feedback for the candidate:
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="textarea w-full mb-4"
              rows={4}
              placeholder="Enter your feedback..."
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeclineModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDecline}
                disabled={!feedback.trim()}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelReviewPage;
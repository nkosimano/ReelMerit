import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Upload } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const MeritPitchPage: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setVideoBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      setRecording(true);

      // Automatically stop recording after 90 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
          setRecording(false);
        }
      }, 90000);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setError('Unable to access camera and microphone');
    }
  };

  const stopRecording = () => {
    if (recording) {
      setRecording(false);
      // The mediaRecorder.onstop handler will create the preview
    }
  };

  const handleSubmit = async () => {
    if (!videoBlob || !user) return;

    setUploading(true);
    setError(null);

    try {
      // Upload video to Supabase Storage
      const fileName = `merit-pitch/${user.id}/pitch.webm`;
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, videoBlob);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // Update user profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          has_completed_merit_pitch: true,
          merit_pitch_url: publicUrl,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error uploading merit pitch:', error);
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Create Your Merit Pitch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600">
                Record a 90-second video introducing yourself and highlighting your key skills.
                This video will be your first impression to potential employers.
              </p>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Guidelines:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Keep it professional and concise</li>
                <li>Highlight your key skills and experience</li>
                <li>Mention your career goals</li>
                <li>Ensure good lighting and clear audio</li>
                <li>Maximum duration: 90 seconds</li>
              </ul>
            </div>

            {!previewUrl ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  {recording ? (
                    <div>
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-gray-900 font-medium mb-2">Recording in progress...</p>
                      <Button
                        variant="primary"
                        onClick={stopRecording}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Stop Recording
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Film className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-900 font-medium mb-2">Ready to record your Merit Pitch?</p>
                      <Button
                        variant="primary"
                        onClick={startRecording}
                        leftIcon={<Film className="w-5 h-5" />}
                      >
                        Start Recording
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full"
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPreviewUrl(null);
                      setVideoBlob(null);
                    }}
                  >
                    Record Again
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    isLoading={uploading}
                    leftIcon={<Upload className="w-5 h-5" />}
                  >
                    Submit Merit Pitch
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeritPitchPage;
import React, { useState, useEffect } from 'react';
import { X, Award, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import { VerificationBadge } from '../ui/Badge';

interface Professional {
  id: string;
  name: string;
  expertise: string[];
  verificationCount: number;
}

interface VerificationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  reelId: string;
  skills: string[];
}

const VerificationRequestModal: React.FC<VerificationRequestModalProps> = ({
  isOpen,
  onClose,
  reelId,
  skills
}) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProfessionals();
    }
  }, [isOpen, skills]);

  const fetchProfessionals = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'Professional')
        .filter('expertise', 'cs', `{${skills.join(',')}}`);

      if (error) throw error;

      setProfessionals(data || []);
    } catch (error) {
      console.error('Error fetching professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProfessional) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('skill_verification_requests')
        .insert([
          {
            reel_id: reelId,
            professional_id: selectedProfessional,
            status: 'pending',
          }
        ]);

      if (error) throw error;
      onClose();
    } catch (error) {
      console.error('Error submitting verification request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Request Skill Verification</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 text-primary-600 animate-spin" />
            </div>
          ) : professionals.length === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No matching professionals found for your skills.
                Please try again later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Select a professional to verify your skills in:
                {skills.map((skill, index) => (
                  <span key={skill} className="font-medium">
                    {index > 0 ? ', ' : ' '}{skill}
                  </span>
                ))}
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {professionals.map((professional) => (
                  <div
                    key={professional.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedProfessional === professional.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedProfessional(professional.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {professional.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {professional.verificationCount} verifications completed
                        </p>
                      </div>
                      <VerificationBadge status="verified" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {professional.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!selectedProfessional || submitting}
            isLoading={submitting}
          >
            Request Verification
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationRequestModal;
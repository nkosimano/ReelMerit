import React from 'react';
import { X, Award, Play } from 'lucide-react';
import { format } from 'date-fns';

interface MeritBadge {
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
}

interface MeritBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  meritBadge: MeritBadge;
}

const MeritBadgeModal: React.FC<MeritBadgeModalProps> = ({
  isOpen,
  onClose,
  meritBadge
}) => {
  if (!isOpen) return null;

  const { professional, awardedAt, videoStatement, rubricScores } = meritBadge;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Award className="w-6 h-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold">Merit Badge Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {professional.name}
                </h3>
                <p className="text-sm text-gray-600">{professional.title}</p>
              </div>
              <p className="text-sm text-gray-500">
                Awarded {format(new Date(awardedAt), 'MMM d, yyyy')}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {professional.expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Verification Statement</h4>
            <div className="aspect-video bg-gray-100 rounded-lg relative cursor-pointer group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:bg-opacity-100 transition-all">
                  <Play className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <video
                src={videoStatement}
                className="w-full h-full rounded-lg"
                controls
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Skill Assessment</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary-600">
                  {rubricScores.clarity}/5
                </div>
                <p className="text-sm text-gray-600">Clarity</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary-600">
                  {rubricScores.technicalAccuracy}/5
                </div>
                <p className="text-sm text-gray-600">Technical Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-primary-600">
                  {rubricScores.efficiency}/5
                </div>
                <p className="text-sm text-gray-600">Efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeritBadgeModal;
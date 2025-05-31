import React from 'react';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface MeritBadgeIconProps {
  onClick?: () => void;
  className?: string;
}

const MeritBadgeIcon: React.FC<MeritBadgeIconProps> = ({ onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center ${className}`}
      title="Verified Skill"
    >
      <div className="absolute inset-0 rounded-full bg-success-500 opacity-20 group-hover:opacity-30 transition-opacity" />
      <Award className="w-6 h-6 text-success-600" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 hidden group-hover:block">
        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Verified Skill
        </div>
        <div className="w-2 h-2 bg-gray-900 transform rotate-45 translate-x-1/2 translate-y-[-4px] absolute left-1/2" />
      </div>
    </motion.button>
  );
};

export default MeritBadgeIcon;
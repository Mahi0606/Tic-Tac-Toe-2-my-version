import React from 'react';
import { CellValue } from '../types/game';
import { motion } from 'framer-motion';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinningCell: boolean;
  index: number;
  isWarning?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell, index, isWarning = false }) => {
  const animationDelay = 0.05 * index;
  
  return (
    <motion.div
      className={`
        aspect-square border-2 border-white/20 rounded-md flex items-center justify-center
        text-4xl font-bold cursor-pointer transition-all duration-300
        ${isWinningCell ? 'bg-emerald-500/20 border-emerald-500/50' : 'hover:bg-white/5'}
      `}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: animationDelay, duration: 0.3 }}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
    >
      {value && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: isWarning ? [1, 0.8, 1] : 1,
            rotate: 0,
            opacity: isWarning ? [1, 0.5, 1] : 1
          }}
          transition={isWarning ? {
            repeat: Infinity,
            duration: 1,
            ease: "easeInOut"
          } : {
            type: 'spring',
            stiffness: 150,
            damping: 15
          }}
          className={`
            ${value === 'X' ? 'text-emerald-400' : 'text-cyan-400'}
            ${isWinningCell ? 'text-emerald-300' : ''}
            text-5xl
          `}
        >
          {value}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cell;
import React from 'react';
import { Board } from '../types/game';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';

interface GameHistoryProps {
  history: Board[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <motion.div
      className="rounded-xl bg-white/10 backdrop-blur-lg p-6 shadow-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Game History</h3>
      </div>
      <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="flex flex-wrap gap-2 justify-center">
          {history.map((boardState, moveIndex) => (
            <motion.div
              key={moveIndex}
              className="grid grid-cols-3 gap-px bg-white/20 rounded-md overflow-hidden"
              style={{ width: '60px', height: '60px' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * moveIndex, duration: 0.3 }}
            >
              {boardState.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className="bg-white/5 flex items-center justify-center text-xs font-semibold"
                >
                  {cell && <span className={cell === 'X' ? 'text-emerald-400' : 'text-cyan-400'}>{cell}</span>}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GameHistory;
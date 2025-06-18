import React from 'react';
import { Player } from '../types/game';
import { motion } from 'framer-motion';
import { RotateCcw, RefreshCw } from 'lucide-react';

interface GameInfoProps {
  currentPlayer: Player;
  scores: { X: number; O: number };
  winner: Player | null;
  onReset: () => void;
  onRestart: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer, scores, winner, onReset, onRestart }) => {
  return (
    <motion.div 
      className="rounded-xl bg-white/10 backdrop-blur-lg p-6 shadow-xl border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 items-center">
          <div className={`p-3 rounded-lg transition-colors ${currentPlayer === 'X' && !winner ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
            <span className="font-bold text-emerald-400">X</span>
            <span className="ml-2 font-semibold text-emerald-200">{scores.X}</span>
          </div>
          <div className={`p-3 rounded-lg transition-colors ${currentPlayer === 'O' && !winner ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
            <span className="font-bold text-cyan-400">O</span>
            <span className="ml-2 font-semibold text-cyan-200">{scores.O}</span>
          </div>
        </div>
      </div>

      {winner ? (
        <motion.div 
          className="text-center py-3 mb-6 bg-emerald-500/20 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <span className="font-bold">
            Player <span className={winner === 'X' ? 'text-emerald-400' : 'text-cyan-400'}>{winner}</span> wins!
          </span>
        </motion.div>
      ) : (
        <div className="text-center py-3 mb-6">
          <span className="font-medium">
            Current turn: 
            <span className={currentPlayer === 'X' ? 'text-emerald-400 ml-2' : 'text-cyan-400 ml-2'}>
              Player {currentPlayer}
            </span>
          </span>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </motion.button>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          Reset All
        </motion.button>
      </div>
    </motion.div>
  );
}

export default GameInfo;
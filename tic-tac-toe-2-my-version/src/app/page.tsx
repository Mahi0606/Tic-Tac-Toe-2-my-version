'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameReducer } from './hooks/useGameReducer';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import GameHistory from './components/GameHistory';
import WinAnimation from './components/WinAnimation';
import { TowerControl as GameController } from 'lucide-react';

export default function Home() {
  const [gameState, dispatch] = useGameReducer();
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  
  const handleCellClick = (index: number) => {
    dispatch({ type: 'MAKE_MOVE', index });
  };
  
  const handleReset = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  const handleRestart = () => {
    dispatch({ type: 'RESTART_GAME' });
  };
  
  useEffect(() => {
    if (gameState.winner) {
      setShowWinAnimation(true);
    }
  }, [gameState.winner]);
  
  const handleAnimationComplete = () => {
    setShowWinAnimation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-teal-900 to-cyan-900 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        className="w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start justify-center gap-8 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center w-full md:w-auto">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GameController className="w-8 h-8" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Tic Tac Toe
            </h1>
          </motion.div>
          
          <div className="w-[min(100%,480px)] aspect-square">
            <Board
              board={gameState.board}
              onCellClick={handleCellClick}
              winningCombination={gameState.winningCombination}
              warningCell={gameState.warningCell}
            />
          </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <GameInfo
            currentPlayer={gameState.currentPlayer}
            scores={gameState.scores}
            winner={gameState.winner}
            onReset={handleReset}
            onRestart={handleRestart}
          />
          
          <GameHistory history={gameState.history} />
        </div>
      </motion.div>
      
      {showWinAnimation && gameState.winner && (
        <WinAnimation
          winner={gameState.winner} 
          onComplete={handleAnimationComplete} 
        />
      )}
    </div>
  );
}
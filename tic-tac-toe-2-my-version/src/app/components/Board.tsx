import React from 'react';
import Cell from './Cell';
import { Board as BoardType } from '../types/game';
import { motion } from 'framer-motion';

interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
  winningCombination: number[] | null;
  warningCell: number | null;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, winningCombination, warningCell }) => {
  return (
    <motion.div 
      className="grid grid-cols-3 gap-2 aspect-square w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={winningCombination?.includes(index) || false}
          isWarning={warningCell === index}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default Board
import { useReducer } from 'react';
import { GameAction, GameState } from '../types/game';
import { checkWinner, forceWinner, getInitialGameState, getNextPlayer, isValidMove } from '../utils/gameLogic';

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action;
      
      if (!isValidMove(state.board, index) || state.winner) {
        return state;
      }
      
      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;
      
      const newMoveCount = state.moveCount + 1;
      const newHistory = [...state.history, [...state.board]];
      const newXMoves = state.currentPlayer === 'X' ? state.xMoves + 1 : state.xMoves;
      const newOMoves = state.currentPlayer === 'O' ? state.oMoves + 1 : state.oMoves;
      
      const { winner, combination } = checkWinner(newBoard);
      
      if (winner) {
        const newScores = { ...state.scores };
        newScores[winner]++;
        
        return {
          ...state,
          board: newBoard,
          winner,
          winningCombination: combination,
          history: newHistory,
          moveCount: newMoveCount,
          scores: newScores,
          warningCell: null,
          xMoves: newXMoves,
          oMoves: newOMoves,
        };
      }
      
      // If there's a warning cell, remove it before processing the new move
      if (state.warningCell !== null) {
        newBoard[state.warningCell] = null;
      }
      
      // Check if the current player has made 3 or more moves
      const currentPlayerMoves = state.currentPlayer === 'X' ? newXMoves : newOMoves;
      if (currentPlayerMoves >= 3) {
        const previousPlayer = getNextPlayer(state.currentPlayer);
        const lastMoveIndex = newBoard.lastIndexOf(previousPlayer);
        
        if (lastMoveIndex !== -1) {
          return {
            ...state,
            board: newBoard,
            currentPlayer: getNextPlayer(state.currentPlayer),
            history: newHistory,
            moveCount: newMoveCount,
            warningCell: lastMoveIndex,
            xMoves: newXMoves,
            oMoves: newOMoves,
          };
        }
      }
      
      if (newMoveCount === 9) {
        const forcedWinner = forceWinner(newBoard, newMoveCount);
        
        if (forcedWinner) {
          const newScores = { ...state.scores };
          newScores[forcedWinner]++;
          
          return {
            ...state,
            board: newBoard,
            winner: forcedWinner,
            history: newHistory,
            moveCount: newMoveCount,
            scores: newScores,
            warningCell: null,
            xMoves: newXMoves,
            oMoves: newOMoves,
          };
        }
      }
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: getNextPlayer(state.currentPlayer),
        history: newHistory,
        moveCount: newMoveCount,
        warningCell: null,
        xMoves: newXMoves,
        oMoves: newOMoves,
      };
    }
    
    case 'RESET_GAME': {
      return {
        ...getInitialGameState(),
        scores: state.scores,
      };
    }
    
    case 'RESTART_GAME': {
      return getInitialGameState();
    }
    
    default:
      return state;
  }
};

export const useGameReducer = () => {
  return useReducer(gameReducer, getInitialGameState());
};
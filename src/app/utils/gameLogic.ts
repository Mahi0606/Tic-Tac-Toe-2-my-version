import { Board, GameState, Player } from '../types/game';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

export const checkWinner = (board: Board): { winner: Player | null; combination: number[] | null } => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, combination };
    }
  }
  return { winner: null, combination: null };
};

const findLastMove = (board: Board, player: Player): number => {
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i] === player) {
      return i;
    }
  }
  return -1;
};

export const removeLastMove = (board: Board, currentPlayer: Player): { newBoard: Board; removedIndex: number | null } => {
  const previousPlayer = getNextPlayer(currentPlayer);
  const lastMoveIndex = findLastMove(board, previousPlayer);
  
  if (lastMoveIndex !== -1) {
    const newBoard = [...board];
    newBoard[lastMoveIndex] = null;
    return { newBoard, removedIndex: lastMoveIndex };
  }
  
  return { newBoard: board, removedIndex: null };
};

export const forceWinner = (board: Board, moveCount: number): Player | null => {
  if (moveCount < 9) return null;
  
  const xCount = board.filter(cell => cell === 'X').length;
  const oCount = board.filter(cell => cell === 'O').length;
  
  if (xCount > oCount) return 'X';
  if (oCount > xCount) return 'O';
  
  return 'X';
};

export const isValidMove = (board: Board, index: number): boolean => {
  return board[index] === null;
};

export const getInitialGameState = (): GameState => ({
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  winningCombination: null,
  history: [],
  moveCount: 0,
  scores: {
    X: 0,
    O: 0,
  },
  warningCell: null,
  xMoves: 0,
  oMoves: 0,
});

export const getNextPlayer = (currentPlayer: Player): Player => {
  return currentPlayer === 'X' ? 'O' : 'X';
};
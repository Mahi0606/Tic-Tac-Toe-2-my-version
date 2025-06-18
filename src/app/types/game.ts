export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winningCombination: number[] | null;
  history: Board[];
  moveCount: number;
  scores: {
    X: number;
    O: number;
  };
  warningCell: number | null;
  xMoves: number;
  oMoves: number;
}

export type GameAction = 
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'RESET_GAME' }
  | { type: 'RESTART_GAME' };
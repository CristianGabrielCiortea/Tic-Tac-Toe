// board.component.ts
import { Component } from '@angular/core';
import { CellStates } from '../cell/CellStates';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  private currentPlayer: CellStates = CellStates.X;
  public isGameOver = false;
  public board: CellStates[][] = [];
  public status = '';

  constructor() {}

  ngOnInit(): void {
    this.startNewGame();
  }

  public startNewGame(): void {
    this.board = Array.from({ length: 3 }, () =>
      Array(3).fill(CellStates.EMPTY)
    );
    this.isGameOver = false;
    this.updateStatus();
  }

  public makeMove(row: number, col: number): void {
    if (this.isCellOccupied(row, col) || this.isGameOver) {
      return;
    }

    this.board[row][col] = this.currentPlayer;
    if (this.checkForWinner(row, col)) {
      this.endGame(`Player ${this.currentPlayer} wins!`);
    } else if (this.isBoardFull()) {
      this.endGame('Draw!');
    } else {
      this.togglePlayer();
      this.updateStatus();
    }
  }

  private isCellOccupied(row: number, col: number): boolean {
    return this.board[row][col] !== CellStates.EMPTY;
  }

  private checkForWinner(row: number, col: number): boolean {
    const isWinningRow = this.board[row].every(
      (cell) => cell === this.currentPlayer
    );
    const isWinningColumn = this.board.every(
      (rowArr) => rowArr[col] === this.currentPlayer
    );
    const isWinningDiagonal =
      (row === col &&
        this.board.every(
          (rowArr, index) => rowArr[index] === this.currentPlayer
        )) ||
      (row + col === 2 &&
        this.board.every(
          (rowArr, index) => rowArr[2 - index] === this.currentPlayer
        ));

    return isWinningRow || isWinningColumn || isWinningDiagonal;
  }

  private togglePlayer(): void {
    this.currentPlayer =
      this.currentPlayer === CellStates.X ? CellStates.O : CellStates.X;
  }

  private endGame(message: string): void {
    this.isGameOver = true;
    this.status = message;
  }

  private updateStatus(): void {
    this.status = `Player ${this.currentPlayer} turn`;
  }

  private isBoardFull(): boolean {
    return this.board.every((row) =>
      row.every((cell) => cell !== CellStates.EMPTY)
    );
  }

  reset(): void {
    this.startNewGame();
  }
}

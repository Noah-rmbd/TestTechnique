export type Player = 'p1' | 'p2';
export type GameStatus = 'inProgress' | 'won' | 'draw';
export type Cell = Player | null;

export class Game {
    readonly rows = 6;
    readonly cols = 7;
    readonly directions = [
        [0, 1],   // Horizontale
        [1, 0],   // Verticale
        [1, 1],   // Diagonale descendante (\)
        [1, -1]   // Diagonale montante (/)
    ];

    currentPlayer: Player = 'p1';
    gameStatus: GameStatus = 'inProgress';
    winner: Player | null = null;
    grid: Cell[] = [];

    constructor() {
        this.reset();
    }

    reset(): void {
        this.currentPlayer = 'p1';
        this.gameStatus = 'inProgress';
        this.winner = null;
        this.grid = Array(this.rows * this.cols).fill(null);
    }

    playColumn(column: number): number | null {
        if (this.gameStatus !== 'inProgress' || column < 0 || column >= this.cols) {
            return null;
        }

        for (let row = this.rows - 1; row >= 0; row--) {
            const index = column + this.cols * row;
            if (this.grid[index] === null) {
                this.grid[index] = this.currentPlayer;

                if (this.checkWin()) {
                    this.gameStatus = 'won';
                    this.winner = this.currentPlayer;
                } else if (this.grid.every(cell => cell !== null)) {
                    this.gameStatus = 'draw';
                } else {
                    this.currentPlayer = this.currentPlayer === 'p1' ? 'p2' : 'p1';
                }

                return index;
            }
        }
        return null;
    }

    private checkDirection(row: number, col: number, deltaRow: number, deltaCol: number, cell: Cell): boolean {
        for (let i = 1; i < 4; i++) {
            const r = row + deltaRow * i;
            const c = col + deltaCol * i;

            if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) {
                return false;
            }

            if (this.grid[r * this.cols + c] !== cell) {
                return false;
            }
        }
        return true;
    }

    checkWin(): boolean {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.grid[row * this.cols + col];
                if (!cell) continue;

                for (const [deltaRow, deltaCol] of this.directions) {
                    if (this.checkDirection(row, col, deltaRow, deltaCol, cell)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}


export function setupGame() {
    const game = new Game();
    return game;
}
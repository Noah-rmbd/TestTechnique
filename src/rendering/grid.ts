import type { Game } from "../types/game.js";

export function setupGrid(gridElement: HTMLDivElement, game: Game, onMove?: () => void) {
    for (let i = 0; i < game.rows * game.cols; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-item';
        cell.dataset.index = String(i);

        gridElement.appendChild(cell);
    }

    gridElement.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLDivElement)) return;

        const clickedCell = event.target.closest<HTMLDivElement>('.grid-item');
        if (clickedCell) {
            const clickedIndex = Number(clickedCell.dataset.index);
            const col = clickedIndex % game.cols;
            const placedIndex = game.playColumn(col);

            if (placedIndex !== null) {
                const player = game.grid[placedIndex];
                const targetCell = gridElement.children[placedIndex] as HTMLDivElement;
                if (player) {
                    targetCell.classList.add(player);
                }
                if (onMove) onMove();
            }
        }
    });

    const clearGrid = () => {
        for (const child of gridElement.children) {
            child.classList.remove('p1', 'p2');
        }
    };

    return { clearGrid };
}
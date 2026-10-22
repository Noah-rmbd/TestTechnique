import './styles/style.css'
import { setupGrid } from './rendering/grid.ts'
import { Game } from './types/game.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div>
    <h1>Connect 4</h1>
    <h2 id="status">Au tour de : Joueur 1 (Rouge)</h2>
    <button id="reset-btn" type="button" class="reset-button hidden">Rejouer</button>
  </div>

  <div id="grid" class="grid-container"></div>
</section>
`
const game = new Game();
const statusElement = document.querySelector<HTMLHeadingElement>('#status')!;
const resetBtn = document.querySelector<HTMLButtonElement>('#reset-btn')!;

const updateStatus = () => {
  if (game.gameStatus === 'won') {
    const winnerName = game.winner === 'p1' ? 'Joueur 1 (Rouge)' : 'Joueur 2 (Jaune)';
    statusElement.textContent = `Victoire de ${winnerName} !`;
    resetBtn.classList.remove('hidden');
  } else if (game.gameStatus === 'draw') {
    statusElement.textContent = 'Match nul !';
    resetBtn.classList.remove('hidden');
  } else {
    const playerName = game.currentPlayer === 'p1' ? 'Joueur 1 (Rouge)' : 'Joueur 2 (Jaune)';
    statusElement.textContent = `Au tour de : ${playerName}`;
    resetBtn.classList.add('hidden');
  }
};

const { clearGrid } = setupGrid(
  document.querySelector<HTMLDivElement>('#grid')!,
  game,
  updateStatus
);

resetBtn.addEventListener('click', () => {
  game.reset();
  clearGrid();
  updateStatus();
});
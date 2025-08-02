import './index.css'; 
import GameController from './GameController';

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameController();
    game.startGame(); 
});
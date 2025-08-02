import Board from './Board';

export default class GameController {
    constructor() {
        this.score = 0;
        this.missedCount = 0;
        this.maxMissed = 5;
        this.gameInterval = null;
        this.goblinAppearanceDuration = 1000;
        this.tickInterval = 1100; 

        this.board = new Board();

        this.scoreElement = document.getElementById('score');
        this.missedElement = document.getElementById('missed');
        this.messageElement = document.getElementById('game-message');
        this.restartButton = document.getElementById('restart-button');

        this.initListeners();
        this.updateUI();
    }

    initListeners() {
        this.board.getCells().forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });
        this.restartButton.addEventListener('click', this.startGame.bind(this));
    }

    startGame() {
        this.score = 0;
        this.missedCount = 0;
        this.updateUI();
        this.messageElement.textContent = '';
        this.restartButton.classList.add('hidden');
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }

        this.board.placeGoblin();
        this.gameInterval = setInterval(() => this.tick(), this.tickInterval);
        console.log('Game Started!');
    }

    endGame() {
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        this.board.removeGoblin();
        this.messageElement.textContent = `Game Over! You missed ${this.maxMissed} goblins.Your score: ${this.score }`;
        this.restartButton.classList.remove('hidden');
        console.log('Game Over!');
    }

    tick() {
        if (this.board.activeCellIndex !== -1) {
            this.handleMiss();
        }
        if (this.missedCount < this.maxMissed) {
            this.board.placeGoblin();
        } else {
            this.endGame();
        }
    }

    handleCellClick(event) {
        const clickedCell = event.currentTarget;
        if (this.gameInterval && this.board.hasGoblin(clickedCell)) {
            this.handleHit();
            this.board.removeGoblin();
            if (this.missedCount < this.maxMissed) {
                this.board.placeGoblin();
            } else {
                this.endGame();
            }
        }
    }

    handleHit() {
        this.score++;
        this.updateUI();
        console.log('Hit! Score:', this.score);
    }

    handleMiss() {
        this.missedCount++;
        this.updateUI();
        console.log('Miss! Missed:', this.missedCount);
        if (this.missedCount >= this.maxMissed) {
            this.endGame();
        }
    }

    updateUI() {
        this.scoreElement.textContent = this.score;
        this.missedElement.textContent = `${this.missedCount} / ${this.maxMissed}`;
    }
}
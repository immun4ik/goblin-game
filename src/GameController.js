import Board from './Board';

export default class GameController {
    constructor() {
        this.score = 0;
        this.missedCount = 0;
        this.maxMissed = 5;
        this.gameTimeoutId = null; 
        this.goblinAppearanceDuration = 1000;

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

        if (this.gameTimeoutId) {
            clearTimeout(this.gameTimeoutId);
            this.gameTimeoutId = null;
        }

        this.board.placeGoblin(); 
        this.scheduleNextGoblinMove(); 

        console.log('Game Started!');
    }

    endGame() {
        if (this.gameTimeoutId) {
            clearTimeout(this.gameTimeoutId);
            this.gameTimeoutId = null;
        }
        this.board.removeGoblin();
        this.messageElement.textContent = `Game Over! You missed ${this.maxMissed} goblins.Your score: ${this.score }.`;
        this.restartButton.classList.remove('hidden');
        console.log('Game Over!');
    }

scheduleNextGoblinMove() {
    if (this.gameTimeoutId) {
        clearTimeout(this.gameTimeoutId);
    }
    this.gameTimeoutId = setTimeout(() => {
        this.moveGoblin(); 
    }, this.goblinAppearanceDuration);
}


moveGoblin() {
    if (this.board.activeCellIndex !== -1) {
        this.handleMiss();
    }

    
    if (this.missedCount >= this.maxMissed) {
        this.endGame();
        return; 
    }

    this.board.placeGoblin(); 
    this.scheduleNextGoblinMove(); 
}

handleCellClick(event) {
    const clickedCell = event.currentTarget;

    if (!this.gameTimeoutId) {
        return;
    }

    if (this.board.hasGoblin(clickedCell)) {
        this.handleHit();
        this.board.removeGoblin(); 
        if (this.missedCount < this.maxMissed) {
            this.board.placeGoblin();
            this.scheduleNextGoblinMove(); 
        } else {
            this.endGame();
        }
    } else {
        this.handleMiss();
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
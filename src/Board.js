export default class Board {
    constructor(gridSize = 4) {
        this.gridSize = gridSize;
        this.cells = [];
        this.activeCellIndex = -1;
        this.boardElement = document.getElementById('game-board');
        if (!this.boardElement) {
            throw new Error('Game board element not found!');
        }
        this.createBoard();
    }

    createBoard() {
        this.boardElement.innerHTML = '';
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            this.cells.push(cell);
            // Используем append вместо appendChild
            this.boardElement.append(cell);
        }
    }


    placeGoblin() {
        this.removeGoblin();

        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.cells.length);
        } while (newIndex === this.activeCellIndex);

        this.activeCellIndex = newIndex;
        const targetCell = this.cells[this.activeCellIndex];
        const goblin = document.createElement('div');
        goblin.classList.add('goblin', 'active');

        targetCell.append(goblin);

        return this.activeCellIndex;
    }


    removeGoblin() {
        if (this.activeCellIndex !== -1) {
            const currentCell = this.cells[this.activeCellIndex];
            const goblin = currentCell.querySelector('.goblin');
            if (goblin) {
                goblin.remove();
            }
            this.activeCellIndex = -1;
        }
    }

    hasGoblin(cellElement) {
        return cellElement.querySelector('.goblin.active') !== null;
    }

    getCells() {
        return this.cells;
    }
}
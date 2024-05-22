const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const playerClass = 'x';
const computerClass = 'o';
let board = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    const currentClass = playerClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        computerMove();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass.toUpperCase();
    board[Array.prototype.indexOf.call(cells, cell)] = currentClass;
}

function computerMove() {
    const emptyCells = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cell = cells[randomIndex];
    placeMark(cell, computerClass);
    if (checkWin(computerClass)) {
        endGame(false, computerClass);
    } else if (isDraw()) {
        endGame(true);
    }
}

function endGame(draw, winner) {
    if (draw) {
        messageElement.innerText = 'Empate!';
    } else {
        messageElement.innerText = `${winner === playerClass ? 'Jugador' : 'Computadora'} gana!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
    return board.every(cell => cell !== null);
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function restartGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.classList.remove(playerClass);
        cell.classList.remove(computerClass);
        cell.innerText = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageElement.innerText = '';
}

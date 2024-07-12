const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';

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

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('X');
        cell.classList.remove('O');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    message.textContent = "Player X's turn";
}

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentPlayer) {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function setBoardHoverClass() {
    board.classList.remove('X');
    board.classList.remove('O');
    board.classList.add(currentPlayer);
}

function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentPlayer);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O');
    });
}

function endGame(draw) {
    if (draw) {
        message.textContent = 'Draw!';
    } else {
        message.textContent = `Player ${currentPlayer} wins!`;
    }
}

restartButton.addEventListener('click', startGame);

startGame()
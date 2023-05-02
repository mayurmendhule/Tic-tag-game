// game state
let gameState = {
  player: 'X',
  board: ['', '', '', '', '', '', '', '', ''],
  gameOver: false,
  winner: null
};

// constants
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

// helper functions
const getCellIndex = (cell) => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  return cells.indexOf(cell);
};

const displayPlayerTurn = () => {
  const turn = document.getElementById('turn');
  turn.innerText = `It is the turn of '${gameState.player}'!`;
};

const displayWinner = () => {
  const result = document.getElementById('result');
  result.innerText = `'${gameState.winner}' is the winner!`;
};

const displayDraw = () => {
  const result = document.getElementById('result');
  result.innerText = 'The game is a draw!';
};

const displayRestartButton = () => {
  const button = document.createElement('button');
  button.innerText = 'Restart Game';
  button.addEventListener('click', restartGame);
  const body = document.querySelector('body');
  body.appendChild(button);
};

const togglePlayer = () => {
  gameState.player = gameState.player === 'X' ? 'O' : 'X';
};

const updateBoard = (cellIndex) => {
  gameState.board[cellIndex] = gameState.player;
};

const checkForWinner = () => {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const board = gameState.board;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      gameState.gameOver = true;
      gameState.winner = gameState.player;
      return;
    }
  }
  if (gameState.board.every((cell) => cell)) {
    gameState.gameOver = true;
  }
};

const updateUI = (cell) => {
  cell.innerText = gameState.player;
  displayPlayerTurn();
  if (gameState.gameOver) {
    if (gameState.winner) {
      displayWinner();
    } else {
      displayDraw();
    }
    displayRestartButton();
  }
};

// event handlers
const playerMove = (cell) => {
  const cellIndex = getCellIndex(cell);
  if (!gameState.board[cellIndex] && !gameState.gameOver) {
    updateBoard(cellIndex);
    checkForWinner();
    updateUI(cell);
    togglePlayer();
  }
};

const restartGame = () => {
  gameState = {
    player: 'X',
    board: ['', '', '', '', '', '', '', '', ''],
    gameOver: false,
    winner: null
  };
  const cells = Array.from(document.querySelectorAll('.cell'));
  cells.forEach((cell) => cell.innerText = '');
  const result = document.getElementById('result');
  result.innerText = '';
  const button = document.querySelector('button');
  button.parentNode.removeChild(button);
  displayPlayerTurn();
};

// initialization
displayPlayerTurn();

// Gameboard Module (IIFE) - Since we only need one gameboard
const Gameboard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const placeMark = (row, column, mark) => {
    if (board[row][column] === "") {
      board[row][column] = mark;
    }
  };

  return { getBoard, placeMark };
})();

// Player Factory - Since we need multiple players
// Not IIFE - Since we want to create multiple instances of a Player
const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

// Game Controller Module (IIFE) - Handles game flow and logic
const GameController = (() => {
  const playerX = Player("playerX", "X");
  const playerO = Player("playerO", "O");
  let currentPlayer = playerX;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const playRound = (row, column) => {
    if (!gameOver) {
      Gameboard.placeMark(row, column, currentPlayer.getMark());
      if (checkWin(currentPlayer.getMark())) {
        gameOver = true;
      }
      switchPlayer();
    }
  };

  const checkWin = (mark) => {
    const board = Gameboard.getBoard();

    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] === mark &&
        board[row][1] === mark &&
        board[row][2] === mark
      )
        return true;
    }

    return false;
  };

  const resetGame = () => {};

  return { playRound };
})();

// Display Controller Module (IIFE) - Handles UI Updates
const DisplayController = (() => {})();

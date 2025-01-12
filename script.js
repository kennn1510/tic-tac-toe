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
        console.log(`${currentPlayer.getName()} has won!`);
      }
      switchPlayer();
    }
  };

  const checkWin = (mark) => {
    const board = Gameboard.getBoard();

    for (let i = 0; i < 3; i++) {
      // Check 3 in a row
      if (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark)
        return true;
      // Check 3 in a column
      if (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark)
        return true;
    }
    // Check top-left to bottom-right
    if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark)
      return true;
    // Check bottom-left to top-right
    if (board[2][0] === mark && board[1][1] === mark && board[0][2] === mark)
      return true;

    return false;
  };

  const resetGame = () => {};

  return { playRound };
})();

// Display Controller Module (IIFE) - Handles UI Updates
const DisplayController = (() => {})();

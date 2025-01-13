// Gameboard Module (IIFE) - Since we only need one gameboard
const Gameboard = (() => {
  const board = [
    ["X", "O", "X"],
    ["X", "O", "O"],
    ["O", "O", "X"],
  ];

  const getBoard = () => board;

  const placeMark = (row, column, mark) => {
    if (board[row][column] === "") {
      board[row][column] = mark;
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
  };

  return { getBoard, placeMark, resetBoard };
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
  let winner = null;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const playRound = (row, column) => {
    if (!gameOver) {
      Gameboard.placeMark(row, column, currentPlayer.getMark());
      if (checkWin(currentPlayer.getMark())) {
        gameOver = true;
        winner = currentPlayer.getName();
      }
      if (winner === null && checkDraw()) {
        gameOver = true;
        winner = "Draw";
      }
      switchPlayer();
    }
    return Gameboard.getBoard();
  };

  const checkDraw = () => {
    const board = Gameboard.getBoard();
    // Check each cell to see if it is either X or O
    // After, check if any player has won?
    // if not, then it is a draw
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] !== "X" || board[i][j] !== "O") {
          return false;
        }
      }
    }
    return true;
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

  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = playerX;
    gameOver = false;
    winner = null;
  };

  return { playRound, resetGame };
})();

// Display Controller Module (IIFE) - Handles UI Updates
const DisplayController = (() => {
  const board = document.querySelector(".board");
  const cells = document.querySelectorAll(".cell");
  // cells.forEach((cell) => {
  //   cell.addEventListener("click", GameController.playRound());
  // });
  const displayBoard = () => {
    const gameBoard = Gameboard.getBoard();

    let rowCounter = 0;
    let colCounter = 0;
    cells.forEach((cell) => {
      cell.textContent = gameBoard[rowCounter][colCounter++];
      if (colCounter === 3) {
        rowCounter++;
        colCounter = 0;
      }
    });
  };

  return { displayBoard };
})();
DisplayController.displayBoard();

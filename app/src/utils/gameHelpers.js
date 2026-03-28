// // /**
// //  * gameHelpers.js — Core Tetris game logic
// //  *
// //  * These are pure functions — given input, they always return
// //  * the same output. Pure functions are:
// //  * - Easy to test (no side effects)
// //  * - Easy to reason about
// //  * - Preferred in functional programming
// //  */

// // // ===========================
// // // Board Constants
// // // ===========================
// // const BOARD_WIDTH = 10;
// // const BOARD_HEIGHT = 20;

// // // ===========================
// // // Tetromino Definitions
// // // ===========================
// // // Each tetromino has a shape (2D array) and a color
// // // 0 = empty cell, 1 = filled cell

// // const TETROMINOES = {
// //   I: {
// //     shape: [
// //       [0, 0, 0, 0],
// //       [1, 1, 1, 1],
// //       [0, 0, 0, 0],
// //       [0, 0, 0, 0],
// //     ],
// //     color: '80, 227, 230',  // Cyan
// //   },
// //   O: {
// //     shape: [
// //       [1, 1],
// //       [1, 1],
// //     ],
// //     color: '223, 173, 36',  // Yellow
// //   },
// //   T: {
// //     shape: [
// //       [0, 1, 0],
// //       [1, 1, 1],
// //       [0, 0, 0],
// //     ],
// //     color: '132, 61, 198',  // Purple
// //   },
// //   S: {
// //     shape: [
// //       [0, 1, 1],
// //       [1, 1, 0],
// //       [0, 0, 0],
// //     ],
// //     color: '65, 232, 55',   // Green
// //   },
// //   Z: {
// //     shape: [
// //       [1, 1, 0],
// //       [0, 1, 1],
// //       [0, 0, 0],
// //     ],
// //     color: '227, 78, 78',   // Red
// //   },
// //   J: {
// //     shape: [
// //       [1, 0, 0],
// //       [1, 1, 1],
// //       [0, 0, 0],
// //     ],
// //     color: '26, 100, 227',  // Blue
// //   },
// //   L: {
// //     shape: [
// //       [0, 0, 1],
// //       [1, 1, 1],
// //       [0, 0, 0],
// //     ],
// //     color: '227, 153, 26',  // Orange
// //   },
// // };

// // // ===========================
// // // Board Creation
// // // ===========================

// // /**
// //  * Creates an empty Tetris board
// //  * Array.from creates a new array; without it, all rows would be
// //  * the SAME array reference (a common JavaScript bug!)
// //  */
// // const createBoard = () =>
// //   Array.from({ length: BOARD_HEIGHT }, () =>
// //     Array(BOARD_WIDTH).fill([0, 'clear'])
// //   );

// // // ===========================
// // // Random Tetromino
// // // ===========================

// // /**
// //  * Returns a random tetromino
// //  * The 'I' piece at the end makes I slightly more common
// //  * (a common Tetris game design choice)
// //  */
// // const randomTetromino = () => {
// //   const keys = 'IOTSZJL'.split('');
// //   const key = keys[Math.floor(Math.random() * keys.length)];
// //   return TETROMINOES[key];
// // };

// // // ===========================
// // // Collision Detection
// // // ===========================

// // /**
// //  * Checks if a tetromino would collide at a given position
// //  *
// //  * @param {Object} player - Current player state {tetromino, pos}
// //  * @param {Array}  board  - Current board state
// //  * @param {Object} move   - Attempted move {x, y} delta
// //  * @returns {boolean} - true if collision detected
// //  */
// // const checkCollision = (player, board, move) => {
// //   for (let y = 0; y < player.tetromino.length; y++) {
// //     for (let x = 0; x < player.tetromino[y].length; x++) {
// //       // 1. Check if we're actually on a tetromino cell
// //       if (player.tetromino[y][x] !== 0) {
// //         const newY = y + player.pos.y + move.y;
// //         const newX = x + player.pos.x + move.x;

// //         // 2. Check if we're outside the board (left, right, bottom)
// //         if (
// //           newY >= BOARD_HEIGHT ||  // Hit bottom
// //           newX < 0 ||              // Hit left wall
// //           newX >= BOARD_WIDTH      // Hit right wall
// //         ) {
// //           return true;
// //         }

// //         // 3. Check if the board cell is occupied (not 'clear')
// //         if (newY >= 0 && board[newY][newX][1] !== 'clear') {
// //           return true;
// //         }
// //       }
// //     }
// //   }
// //   return false;
// // };

// // // ===========================
// // // Row Clearing
// // // ===========================

// // /**
// //  * Sweeps completed rows and returns updated board + row count
// //  *
// //  * A row is complete when every cell is filled (not 'clear')
// //  * Completed rows are removed and new empty rows added at top
// //  *
// //  * @param {Array} board - Current board state
// //  * @returns {Object} { newBoard, rowsCleared }
// //  */
// // const sweepRows = (board) => {
// //   let rowsCleared = 0;

// //   const newBoard = board.reduce((acc, row) => {
// //     // If every cell in this row is filled
// //     if (row.every((cell) => cell[1] !== 'clear')) {
// //       rowsCleared++;
// //       // Add an empty row at the TOP of the board
// //       acc.unshift(Array(BOARD_WIDTH).fill([0, 'clear']));
// //       // This row is NOT added back (it gets cleared)
// //     } else {
// //       acc.push(row);
// //     }
// //     return acc;
// //   }, []);

// //   return { newBoard, rowsCleared };
// // };

// // // ===========================
// // // Score Calculation
// // // ===========================

// // // Classic Tetris scoring: more rows at once = more points
// // const POINTS = {
// //   1: 40,
// //   2: 100,
// //   3: 300,
// //   4: 1200,  // "Tetris!" — clearing 4 rows at once
// // };

// // /**
// //  * Calculates score for cleared rows
// //  * Level multiplier: higher level = more points per row
// //  */
// // const calcScore = (rowsCleared, level) => {
// //   return (POINTS[rowsCleared] || 0) * (level + 1);
// // };

// // /**
// //  * Calculates which level the player should be on
// //  * Every 10 lines = next level
// //  */
// // const calcLevel = (rows) => Math.floor(rows / 10) + 1;

// // /**
// //  * Calculates drop speed based on level
// //  * Returns interval in milliseconds — lower = faster
// //  */
// // const calcDropSpeed = (level) => {
// //   // Level 1: 800ms, Level 10: ~100ms
// //   return Math.max(100, 800 - (level - 1) * 80);
// // };

// // module.exports = {
// //   BOARD_WIDTH,
// //   BOARD_HEIGHT,
// //   TETROMINOES,
// //   createBoard,
// //   randomTetromino,
// //   checkCollision,
// //   sweepRows,
// //   calcScore,
// //   calcLevel,
// //   calcDropSpeed,
// // };


// // const BOARD_WIDTH = 10;
// // const BOARD_HEIGHT = 20;

// // const TETROMINOES = {
// //   I: {
// //     shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
// //     color: '80, 227, 230',
// //   },
// //   O: {
// //     shape: [[1,1],[1,1]],
// //     color: '223, 173, 36',
// //   },
// //   T: {
// //     shape: [[0,1,0],[1,1,1],[0,0,0]],
// //     color: '132, 61, 198',
// //   },
// //   S: {
// //     shape: [[0,1,1],[1,1,0],[0,0,0]],
// //     color: '65, 232, 55',
// //   },
// //   Z: {
// //     shape: [[1,1,0],[0,1,1],[0,0,0]],
// //     color: '227, 78, 78',
// //   },
// //   J: {
// //     shape: [[1,0,0],[1,1,1],[0,0,0]],
// //     color: '26, 100, 227',
// //   },
// //   L: {
// //     shape: [[0,0,1],[1,1,1],[0,0,0]],
// //     color: '227, 153, 26',
// //   },
// // };

// // const createBoard = () =>
// //   Array.from({ length: BOARD_HEIGHT }, () =>
// //     Array(BOARD_WIDTH).fill([0, 'clear'])
// //   );

// // const randomTetromino = () => {
// //   const keys = 'IOTSZJL'.split('');
// //   const key = keys[Math.floor(Math.random() * keys.length)];
// //   return TETROMINOES[key];
// // };

// // const checkCollision = (player, board, move) => {
// //   for (let y = 0; y < player.tetromino.length; y++) {
// //     for (let x = 0; x < player.tetromino[y].length; x++) {
// //       if (player.tetromino[y][x] !== 0) {
// //         const newY = y + player.pos.y + move.y;
// //         const newX = x + player.pos.x + move.x;
// //         if (
// //           newY >= BOARD_HEIGHT ||
// //           newX < 0 ||
// //           newX >= BOARD_WIDTH
// //         ) {
// //           return true;
// //         }
// //         if (newY >= 0 && board[newY][newX][1] !== 'clear') {
// //           return true;
// //         }
// //       }
// //     }
// //   }
// //   return false;
// // };

// // const sweepRows = (board) => {
// //   let rowsCleared = 0;
// //   const newBoard = board.reduce((acc, row) => {
// //     if (row.every((cell) => cell[1] !== 'clear')) {
// //       rowsCleared++;
// //       acc.unshift(Array(BOARD_WIDTH).fill([0, 'clear']));
// //     } else {
// //       acc.push(row);
// //     }
// //     return acc;
// //   }, []);
// //   return { newBoard, rowsCleared };
// // };

// // const POINTS = { 1: 40, 2: 100, 3: 300, 4: 1200 };

// // const calcScore = (rowsCleared, level) => {
// //   return (POINTS[rowsCleared] || 0) * (level + 1);
// // };

// // const calcLevel = (rows) => Math.floor(rows / 10) + 1;

// // const calcDropSpeed = (level) => {
// //   return Math.max(100, 800 - (level - 1) * 80);
// // };

// // module.exports = {
// //   BOARD_WIDTH,
// //   BOARD_HEIGHT,
// //   TETROMINOES,
// //   createBoard,
// //   randomTetromino,
// //   checkCollision,
// //   sweepRows,
// //   calcScore,
// //   calcLevel,
// //   calcDropSpeed,
// // };

// // Core Tetris game logic
// // Uses CommonJS (module.exports) for Jest compatibility
// // Babel handles the import/export conversion for React

// const BOARD_WIDTH = 10;
// const BOARD_HEIGHT = 20;

// const TETROMINOES = {
//   I: {
//     shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
//     color: '80, 227, 230',
//   },
//   O: {
//     shape: [[1,1],[1,1]],
//     color: '223, 173, 36',
//   },
//   T: {
//     shape: [[0,1,0],[1,1,1],[0,0,0]],
//     color: '132, 61, 198',
//   },
//   S: {
//     shape: [[0,1,1],[1,1,0],[0,0,0]],
//     color: '65, 232, 55',
//   },
//   Z: {
//     shape: [[1,1,0],[0,1,1],[0,0,0]],
//     color: '227, 78, 78',
//   },
//   J: {
//     shape: [[1,0,0],[1,1,1],[0,0,0]],
//     color: '26, 100, 227',
//   },
//   L: {
//     shape: [[0,0,1],[1,1,1],[0,0,0]],
//     color: '227, 153, 26',
//   },
// };

// const createBoard = () =>
//   Array.from({ length: BOARD_HEIGHT }, () =>
//     Array(BOARD_WIDTH).fill([0, 'clear'])
//   );

// const randomTetromino = () => {
//   const keys = 'IOTSZJL'.split('');
//   const key = keys[Math.floor(Math.random() * keys.length)];
//   return TETROMINOES[key];
// };

// const checkCollision = (player, board, move) => {
//   for (let y = 0; y < player.tetromino.length; y++) {
//     for (let x = 0; x < player.tetromino[y].length; x++) {
//       if (player.tetromino[y][x] !== 0) {
//         const newY = y + player.pos.y + move.y;
//         const newX = x + player.pos.x + move.x;
//         if (
//           newY >= BOARD_HEIGHT ||
//           newX < 0 ||
//           newX >= BOARD_WIDTH
//         ) {
//           return true;
//         }
//         if (newY >= 0 && board[newY][newX][1] !== 'clear') {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// };

// const sweepRows = (board) => {
//   let rowsCleared = 0;
//   const newBoard = board.reduce((acc, row) => {
//     if (row.every((cell) => cell[1] !== 'clear')) {
//       rowsCleared++;
//       acc.unshift(Array(BOARD_WIDTH).fill([0, 'clear']));
//     } else {
//       acc.push(row);
//     }
//     return acc;
//   }, []);
//   return { newBoard, rowsCleared };
// };

// const POINTS = { 1: 40, 2: 100, 3: 300, 4: 1200 };

// const calcScore = (rowsCleared, level) =>
//   (POINTS[rowsCleared] || 0) * (level + 1);

// const calcLevel = (rows) => Math.floor(rows / 10) + 1;

// const calcDropSpeed = (level) => Math.max(100, 800 - (level - 1) * 80);

// module.exports = {
//   BOARD_WIDTH,
//   BOARD_HEIGHT,
//   TETROMINOES,
//   createBoard,
//   randomTetromino,
//   checkCollision,
//   sweepRows,
//   calcScore,
//   calcLevel,
//   calcDropSpeed,
// };

// Game logic — CommonJS for Jest compatibility
// Webpack (React build) handles require() fine via babel

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TETROMINOES = {
  I: { shape: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], color: '80, 227, 230' },
  O: { shape: [[1,1],[1,1]], color: '223, 173, 36' },
  T: { shape: [[0,1,0],[1,1,1],[0,0,0]], color: '132, 61, 198' },
  S: { shape: [[0,1,1],[1,1,0],[0,0,0]], color: '65, 232, 55' },
  Z: { shape: [[1,1,0],[0,1,1],[0,0,0]], color: '227, 78, 78' },
  J: { shape: [[1,0,0],[1,1,1],[0,0,0]], color: '26, 100, 227' },
  L: { shape: [[0,0,1],[1,1,1],[0,0,0]], color: '227, 153, 26' },
};

const createBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => [0, 'clear', null])
  );

const randomTetromino = () => {
  const keys = 'IOTSZJL'.split('');
  const key = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOES[key];
};

const checkCollision = (player, board, move) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      if (player.tetromino[y][x] !== 0) {
        const newY = y + player.pos.y + move.y;
        const newX = x + player.pos.x + move.x;
        if (newY >= BOARD_HEIGHT || newX < 0 || newX >= BOARD_WIDTH) return true;
        if (newY >= 0 && board[newY][newX][1] !== 'clear') return true;
      }
    }
  }
  return false;
};

// const sweepRows = (board) => {
//   let rowsCleared = 0;
//   const newBoard = board.reduce((acc, row) => {
//     if (row.every((cell) => cell[1] !== 'clear')) {
//       rowsCleared++;
//       acc.unshift(Array(BOARD_WIDTH).fill([0, 'clear']));
//     } else {
//       acc.push(row);
//     }
//     return acc;
//   }, []);
//   return { newBoard, rowsCleared };
// };

const sweepRows = (board) => {
  let rowsCleared = 0;
  const BOARD_WIDTH_LOCAL = board[0].length;
  const newBoard = board.reduce((acc, row) => {
    if (row.every((cell) => cell[1] !== 'clear')) {
      rowsCleared++;
      // New empty row at top — 3-element cells
      acc.unshift(
        Array.from({ length: BOARD_WIDTH_LOCAL }, () => [0, 'clear', null])
      );
    } else {
      acc.push(row);
    }
    return acc;
  }, []);
  return { newBoard, rowsCleared };
};

const POINTS = { 1: 40, 2: 100, 3: 300, 4: 1200 };
const calcScore = (rowsCleared, level) => (POINTS[rowsCleared] || 0) * (level + 1);
const calcLevel = (rows) => Math.floor(rows / 10) + 1;
const calcDropSpeed = (level) => Math.max(100, 800 - (level - 1) * 80);

module.exports = {
  BOARD_WIDTH, BOARD_HEIGHT, TETROMINOES,
  createBoard, randomTetromino, checkCollision,
  sweepRows, calcScore, calcLevel, calcDropSpeed,
};
// // // // // /**
// // // // //  * useBoard.js — Custom React Hook for board state
// // // // //  *
// // // // //  * Manages the game board — the 10x20 grid that holds
// // // // //  * fallen tetrominoes and the current piece
// // // // //  */

// // // // // import { useState, useEffect } from 'react';
// // // // // import { createBoard, sweepRows } from '../utils/gameHelpers';

// // // // // export const useBoard = (player, resetPlayer, setScore, setRows, setLevel) => {
// // // // //   const [board, setBoard] = useState(createBoard());

// // // // //   useEffect(() => {
// // // // //     /**
// // // // //      * updateBoard runs every time the player state changes
// // // // //      * This is the core render loop of the game
// // // // //      */
// // // // //     const updateBoard = (prevBoard) => {
// // // // //       // Step 1: Clear the board of all moving pieces
// // // // //       // Keep only 'merged' pieces (collided = locked in place)
// // // // //       const newBoard = prevBoard.map((row) =>
// // // // //         row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
// // // // //       );

// // // // //       // Step 2: Draw the current tetromino onto the board
// // // // //       player.tetromino.forEach((row, y) => {
// // // // //         row.forEach((value, x) => {
// // // // //           if (value !== 0) {
// // // // //             const boardY = y + player.pos.y;
// // // // //             const boardX = x + player.pos.x;
// // // // //             if (boardY >= 0 && boardY < newBoard.length && boardX >= 0 && boardX < newBoard[0].length) {
// // // // //               newBoard[boardY][boardX] = [
// // // // //                 value,
// // // // //                 `${player.collided ? 'merged' : 'clear'}`,
// // // // //               ];
// // // // //             }
// // // // //           }
// // // // //         });
// // // // //       });

// // // // //       // Step 3: If piece collided, lock it and handle row clearing
// // // // //       if (player.collided) {
// // // // //         resetPlayer();
// // // // //         const { newBoard: swept, rowsCleared } = sweepRows(newBoard);

// // // // //         // Update score and rows
// // // // //         setRows((prev) => {
// // // // //           const newRows = prev + rowsCleared;
// // // // //           setLevel(Math.floor(newRows / 10) + 1);
// // // // //           return newRows;
// // // // //         });

// // // // //         if (rowsCleared > 0) {
// // // // //           setScore((prev) => prev + calcPoints(rowsCleared));
// // // // //         }

// // // // //         return swept;
// // // // //       }

// // // // //       return newBoard;
// // // // //     };

// // // // //     setBoard((prev) => updateBoard(prev));
// // // // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //   }, [player]);

// // // // //   return [board, setBoard];
// // // // // };

// // // // // // Score points per rows cleared (with current level multiplier)
// // // // // const calcPoints = (rowsCleared) => {
// // // // //   const points = { 1: 40, 2: 100, 3: 300, 4: 1200 };
// // // // //   return points[rowsCleared] || 0;
// // // // // };

// // // // const { useState, useEffect } = require('react');
// // // // const { createBoard, sweepRows, BOARD_WIDTH } = require('../utils/gameHelpers');

// // // // const useBoard = (player, resetPlayer, setScore, setRows, setLevel) => {
// // // //   const [board, setBoard] = useState(createBoard());

// // // //   useEffect(() => {
// // // //     const updateBoard = (prevBoard) => {
// // // //       const newBoard = prevBoard.map((row) =>
// // // //         row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
// // // //       );

// // // //       player.tetromino.forEach((row, y) => {
// // // //         row.forEach((value, x) => {
// // // //           if (value !== 0) {
// // // //             const boardY = y + player.pos.y;
// // // //             const boardX = x + player.pos.x;
// // // //             if (
// // // //               boardY >= 0 &&
// // // //               boardY < newBoard.length &&
// // // //               boardX >= 0 &&
// // // //               boardX < newBoard[0].length
// // // //             ) {
// // // //               newBoard[boardY][boardX] = [
// // // //                 value,
// // // //                 player.collided ? 'merged' : 'clear',
// // // //               ];
// // // //             }
// // // //           }
// // // //         });
// // // //       });

// // // //       if (player.collided) {
// // // //         resetPlayer();
// // // //         const { newBoard: swept, rowsCleared } = sweepRows(newBoard);

// // // //         if (rowsCleared > 0) {
// // // //           const points = { 1: 40, 2: 100, 3: 300, 4: 1200 };
// // // //           setScore((prev) => prev + (points[rowsCleared] || 0));
// // // //           setRows((prev) => {
// // // //             const newRows = prev + rowsCleared;
// // // //             setLevel(Math.floor(newRows / 10) + 1);
// // // //             return newRows;
// // // //           });
// // // //         }

// // // //         return swept;
// // // //       }

// // // //       return newBoard;
// // // //     };

// // // //     setBoard((prev) => updateBoard(prev));
// // // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [player]);

// // // //   return [board, setBoard];
// // // // };

// // // // module.exports = { useBoard };

// // // import { useState, useEffect } from 'react';
// // // const { createBoard, sweepRows } = require('../utils/gameHelpers');

// // // export const useBoard = (player, resetPlayer, setScore, setRows, setLevel) => {
// // //   const [board, setBoard] = useState(createBoard());

// // //   useEffect(() => {
// // //     const updateBoard = (prevBoard) => {
// // //       // Clear moving pieces from previous render
// // //       const newBoard = prevBoard.map((row) =>
// // //         row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
// // //       );

// // //       // Draw current tetromino
// // //       player.tetromino.forEach((row, y) => {
// // //         row.forEach((value, x) => {
// // //           if (value !== 0) {
// // //             const bY = y + player.pos.y;
// // //             const bX = x + player.pos.x;
// // //             if (bY >= 0 && bY < newBoard.length && bX >= 0 && bX < newBoard[0].length) {
// // //               newBoard[bY][bX] = [value, player.collided ? 'merged' : 'clear'];
// // //             }
// // //           }
// // //         });
// // //       });

// // //       // Handle collision — lock piece and clear rows
// // //       if (player.collided) {
// // //         resetPlayer();
// // //         const { newBoard: swept, rowsCleared } = sweepRows(newBoard);
// // //         if (rowsCleared > 0) {
// // //           const pts = { 1: 40, 2: 100, 3: 300, 4: 1200 };
// // //           setScore((prev) => prev + (pts[rowsCleared] || 0));
// // //           setRows((prev) => {
// // //             const total = prev + rowsCleared;
// // //             setLevel(Math.floor(total / 10) + 1);
// // //             return total;
// // //           });
// // //         }
// // //         return swept;
// // //       }
// // //       return newBoard;
// // //     };

// // //     setBoard((prev) => updateBoard(prev));
// // //   // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [player]);

// // //   return [board, setBoard];
// // // };

// // import { useState, useEffect } from 'react';
// // const { createBoard, sweepRows } = require('../utils/gameHelpers');

// // export const useBoard = (player, resetPlayer, setScore, setRows, setLevel) => {
// //   const [board, setBoard] = useState(createBoard());

// //   useEffect(() => {
// //     const updateBoard = (prevBoard) => {
// //       // Clear only the moving (non-merged) cells
// //       const newBoard = prevBoard.map((row) =>
// //         row.map((cell) =>
// //           cell[1] === 'clear' ? [0, 'clear', null] : cell
// //         )
// //       );

// //       // Draw current tetromino WITH its color stored in cell[2]
// //       player.tetromino.forEach((row, y) => {
// //         row.forEach((value, x) => {
// //           if (value !== 0) {
// //             const bY = y + player.pos.y;
// //             const bX = x + player.pos.x;
// //             if (
// //               bY >= 0 && bY < newBoard.length &&
// //               bX >= 0 && bX < newBoard[0].length
// //             ) {
// //               newBoard[bY][bX] = [
// //                 value,
// //                 player.collided ? 'merged' : 'clear',
// //                 player.color,   // ← store the tetromino color in cell
// //               ];
// //             }
// //           }
// //         });
// //       });

// //       // Lock piece and sweep rows on collision
// //       if (player.collided) {
// //         resetPlayer();
// //         const { newBoard: swept, rowsCleared } = sweepRows(newBoard);
// //         if (rowsCleared > 0) {
// //           const pts = { 1: 40, 2: 100, 3: 300, 4: 1200 };
// //           setScore((prev) => prev + (pts[rowsCleared] || 0));
// //           setRows((prev) => {
// //             const total = prev + rowsCleared;
// //             setLevel(Math.floor(total / 10) + 1);
// //             return total;
// //           });
// //         }
// //         return swept;
// //       }

// //       return newBoard;
// //     };

// //     setBoard((prev) => updateBoard(prev));
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [player]);

// //   return [board, setBoard];
// // };

// import { useState, useEffect } from 'react';
// const { createBoard, sweepRows } = require('../utils/gameHelpers');

// export const useBoard = (player, resetPlayer, setScore, setRows, setLevel) => {
//   const [board, setBoard] = useState(createBoard());

//   useEffect(() => {
//     const updateBoard = (prevBoard) => {
//       // Step 1: Clear only 'clear' (moving) cells — keep 'merged' (locked) cells
//       const newBoard = prevBoard.map((row) =>
//         row.map((cell) =>
//           cell[1] === 'clear' ? [0, 'clear', null] : cell
//         )
//       );

//       // Step 2: Paint current piece onto board
//       player.tetromino.forEach((row, y) => {
//         row.forEach((value, x) => {
//           if (value !== 0) {
//             const bY = y + player.pos.y;
//             const bX = x + player.pos.x;
//             if (
//               bY >= 0 && bY < newBoard.length &&
//               bX >= 0 && bX < newBoard[0].length
//             ) {
//               newBoard[bY][bX] = [
//                 value,
//                 player.collided ? 'merged' : 'clear',
//                 player.color,
//               ];
//             }
//           }
//         });
//       });

//       // Step 3: If piece just collided, lock it and sweep rows
//       if (player.collided) {
//         resetPlayer();
//         const { newBoard: swept, rowsCleared } = sweepRows(newBoard);
//         if (rowsCleared > 0) {
//           const pts = { 1: 40, 2: 100, 3: 300, 4: 1200 };
//           setScore((prev) => prev + (pts[rowsCleared] || 0));
//           setRows((prev) => {
//             const total = prev + rowsCleared;
//             setLevel(Math.floor(total / 10) + 1);
//             return total;
//           });
//         }
//         return swept;
//       }

//       return newBoard;
//     };

//     setBoard((prev) => updateBoard(prev));
//   // We stringify pos so the effect fires on EVERY position change
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     player.collided,
//     player.color,
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     JSON.stringify(player.pos),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     JSON.stringify(player.tetromino),
//   ]);

//   return [board, setBoard];
// };
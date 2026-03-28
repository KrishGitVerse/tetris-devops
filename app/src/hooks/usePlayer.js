// // // const { useState, useCallback } = require('react');
// // // const { BOARD_WIDTH, randomTetromino, checkCollision } = require('../utils/gameHelpers');

// // // const usePlayer = () => {
// // //   const [player, setPlayer] = useState({
// // //     pos: { x: 0, y: 0 },
// // //     tetromino: randomTetromino().shape,
// // //     color: randomTetromino().color,
// // //     collided: false,
// // //   });

// // //   const rotate = (matrix, dir) => {
// // //     const rotated = matrix.map((_, index) =>
// // //       matrix.map((col) => col[index])
// // //     );
// // //     if (dir > 0) return rotated.map((row) => row.reverse());
// // //     return rotated.reverse();
// // //   };

// // //   const playerRotate = useCallback((board, dir) => {
// // //     const clonedPlayer = JSON.parse(JSON.stringify(player));
// // //     clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

// // //     const pos = clonedPlayer.pos.x;
// // //     let offset = 1;
// // //     while (checkCollision(clonedPlayer, board, { x: 0, y: 0 })) {
// // //       clonedPlayer.pos.x += offset;
// // //       offset = -(offset + (offset > 0 ? 1 : -1));
// // //       if (offset > clonedPlayer.tetromino[0].length) {
// // //         rotate(clonedPlayer.tetromino, -dir);
// // //         clonedPlayer.pos.x = pos;
// // //         return;
// // //       }
// // //     }
// // //     setPlayer(clonedPlayer);
// // //   }, [player]);

// // //   const resetPlayer = useCallback(() => {
// // //     const newTetromino = randomTetromino();
// // //     setPlayer({
// // //       pos: {
// // //         x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newTetromino.shape[0].length / 2),
// // //         y: 0,
// // //       },
// // //       tetromino: newTetromino.shape,
// // //       color: newTetromino.color,
// // //       collided: false,
// // //     });
// // //   }, []);

// // //   const updatePlayerPos = useCallback(({ x, y, collided }) => {
// // //     setPlayer((prev) => ({
// // //       ...prev,
// // //       pos: { x: prev.pos.x + x, y: prev.pos.y + y },
// // //       collided,
// // //     }));
// // //   }, []);

// // //   return { player, updatePlayerPos, resetPlayer, playerRotate };
// // // };

// // // module.exports = { usePlayer };

// // import { useState, useCallback } from 'react';
// // const {
// //   BOARD_WIDTH, randomTetromino, checkCollision,
// // } = require('../utils/gameHelpers');

// // export const usePlayer = () => {
// //   const newTetromino = randomTetromino();
// //   const [player, setPlayer] = useState({
// //     pos: {
// //       x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newTetromino.shape[0].length / 2),
// //       y: 0,
// //     },
// //     tetromino: newTetromino.shape,
// //     color: newTetromino.color,
// //     collided: false,
// //   });

// //   const rotate = (matrix, dir) => {
// //     const rotated = matrix.map((_, i) => matrix.map((col) => col[i]));
// //     if (dir > 0) return rotated.map((row) => row.reverse());
// //     return rotated.reverse();
// //   };

// //   const playerRotate = useCallback((board, dir) => {
// //     const cloned = JSON.parse(JSON.stringify(player));
// //     cloned.tetromino = rotate(cloned.tetromino, dir);
// //     const pos = cloned.pos.x;
// //     let offset = 1;
// //     while (checkCollision(cloned, board, { x: 0, y: 0 })) {
// //       cloned.pos.x += offset;
// //       offset = -(offset + (offset > 0 ? 1 : -1));
// //       if (offset > cloned.tetromino[0].length) {
// //         cloned.pos.x = pos;
// //         return;
// //       }
// //     }
// //     setPlayer(cloned);
// //   }, [player]);

// //   const resetPlayer = useCallback(() => {
// //     const t = randomTetromino();
// //     setPlayer({
// //       pos: {
// //         x: Math.floor(BOARD_WIDTH / 2) - Math.floor(t.shape[0].length / 2),
// //         y: 0,
// //       },
// //       tetromino: t.shape,
// //       color: t.color,
// //       collided: false,
// //     });
// //   }, []);

// //   const updatePlayerPos = useCallback(({ x, y, collided }) => {
// //     setPlayer((prev) => ({
// //       ...prev,
// //       pos: { x: prev.pos.x + x, y: prev.pos.y + y },
// //       collided,
// //     }));
// //   }, []);

// //   return { player, updatePlayerPos, resetPlayer, playerRotate };
// // };

// import { useState, useCallback } from 'react';
// const { BOARD_WIDTH, randomTetromino, checkCollision } = require('../utils/gameHelpers');

// const buildInitialPlayer = () => {
//   const t = randomTetromino();
//   return {
//     pos: {
//       x: Math.floor(BOARD_WIDTH / 2) - Math.floor(t.shape[0].length / 2),
//       y: 0,
//     },
//     tetromino: t.shape,
//     color: t.color,
//     collided: false,
//   };
// };

// export const usePlayer = () => {
//   const [player, setPlayer] = useState(() => buildInitialPlayer());

//   const rotate = (matrix, dir) => {
//     const rotated = matrix.map((_, i) => matrix.map((col) => col[i]));
//     if (dir > 0) return rotated.map((row) => row.reverse());
//     return rotated.reverse();
//   };

//   const playerRotate = useCallback((board, dir) => {
//     const cloned = JSON.parse(JSON.stringify(player));
//     cloned.tetromino = rotate(cloned.tetromino, dir);
//     const originalX = cloned.pos.x;
//     let offset = 1;
//     while (checkCollision(cloned, board, { x: 0, y: 0 })) {
//       cloned.pos.x += offset;
//       offset = -(offset + (offset > 0 ? 1 : -1));
//       if (offset > cloned.tetromino[0].length) {
//         cloned.pos.x = originalX;
//         return;
//       }
//     }
//     setPlayer(cloned);
//   }, [player]);

//   const resetPlayer = useCallback(() => {
//     setPlayer(buildInitialPlayer());
//   }, []);

//   const updatePlayerPos = useCallback(({ x, y, collided }) => {
//     setPlayer((prev) => ({
//       ...prev,
//       pos: { x: prev.pos.x + x, y: prev.pos.y + y },
//       collided,
//     }));
//   }, []);

//   return { player, updatePlayerPos, resetPlayer, playerRotate };
// };
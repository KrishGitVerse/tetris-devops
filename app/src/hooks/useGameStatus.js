// // const { useState, useCallback } = require('react');

// // const useGameStatus = () => {
// //   const [score, setScore] = useState(0);
// //   const [rows, setRows] = useState(0);
// //   const [level, setLevel] = useState(1);
// //   const [gameOver, setGameOver] = useState(false);

// //   const resetGameStatus = useCallback(() => {
// //     setScore(0);
// //     setRows(0);
// //     setLevel(1);
// //     setGameOver(false);
// //   }, []);

// //   return {
// //     score, setScore,
// //     rows, setRows,
// //     level, setLevel,
// //     gameOver, setGameOver,
// //     resetGameStatus,
// //   };
// // };

// // module.exports = { useGameStatus };

// import { useState, useCallback } from 'react';

// export const useGameStatus = () => {
//   const [score, setScore]   = useState(0);
//   const [rows, setRows]     = useState(0);
//   const [level, setLevel]   = useState(1);
//   const [gameOver, setGameOver] = useState(false);

//   const resetGameStatus = useCallback(() => {
//     setScore(0);
//     setRows(0);
//     setLevel(1);
//     setGameOver(false);
//   }, []);

//   return { score, setScore, rows, setRows, level, setLevel,
//            gameOver, setGameOver, resetGameStatus };
// };
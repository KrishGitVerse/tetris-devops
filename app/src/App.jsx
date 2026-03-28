// // // // /**
// // // //  * App.jsx — Main game component
// // // //  *
// // // //  * Ties together all hooks and components
// // // //  * Handles keyboard input
// // // //  */

// // // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // // import Board from './components/Board';
// // // // import GameInfo from './components/GameInfo';
// // // // import { usePlayer } from './hooks/usePlayer';
// // // // import { useBoard } from './hooks/useBoard';
// // // // import { useGameStatus } from './hooks/useGameStatus';
// // // // import { checkCollision, createBoard, calcDropSpeed } from './utils/gameHelpers';

// // // // const App = () => {
// // // //   const [dropTime, setDropTime] = useState(null);
// // // //   const [gameStarted, setGameStarted] = useState(false);
// // // //   const gameArea = useRef();

// // // //   const {
// // // //     score, setScore,
// // // //     rows, setRows,
// // // //     level, setLevel,
// // // //     gameOver, setGameOver,
// // // //     resetGameStatus,
// // // //   } = useGameStatus();

// // // //   const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
// // // //   const [board, setBoard] = useBoard(
// // // //     player, resetPlayer, setScore, setRows, setLevel
// // // //   );

// // // //   /**
// // // //    * Starts or restarts the game
// // // //    */
// // // //   const startGame = useCallback(() => {
// // // //     setBoard(createBoard());
// // // //     resetGameStatus();
// // // //     resetPlayer();
// // // //     setDropTime(calcDropSpeed(1));
// // // //     setGameStarted(true);
// // // //     gameArea.current?.focus();
// // // //   }, [resetGameStatus, resetPlayer, setBoard]);

// // // //   /**
// // // //    * Hard drop — piece falls instantly to bottom
// // // //    */
// // // //   const hardDrop = useCallback(() => {
// // // //     let dropY = 0;
// // // //     while (!checkCollision(player, board, { x: 0, y: dropY + 1 })) {
// // // //       dropY++;
// // // //     }
// // // //     updatePlayerPos({ x: 0, y: dropY, collided: true });
// // // //   }, [player, board, updatePlayerPos]);

// // // //   /**
// // // //    * Drops piece one row (soft drop or auto-drop)
// // // //    */
// // // //   const drop = useCallback(() => {
// // // //     // Increase level every 10 rows
// // // //     if (rows > (level * 10)) {
// // // //       setLevel((prev) => {
// // // //         const newLevel = prev + 1;
// // // //         setDropTime(calcDropSpeed(newLevel));
// // // //         return newLevel;
// // // //       });
// // // //     }

// // // //     if (!checkCollision(player, board, { x: 0, y: 1 })) {
// // // //       updatePlayerPos({ x: 0, y: 1, collided: false });
// // // //     } else {
// // // //       // Piece has landed
// // // //       if (player.pos.y < 1) {
// // // //         // Game over: piece collided at the top
// // // //         setGameOver(true);
// // // //         setDropTime(null);
// // // //       } else {
// // // //         updatePlayerPos({ x: 0, y: 0, collided: true });
// // // //       }
// // // //     }
// // // //   }, [board, level, player, rows, setGameOver, setLevel, updatePlayerPos]);

// // // //   /**
// // // //    * Handle keyboard input
// // // //    */
// // // //   const handleKeyDown = useCallback((e) => {
// // // //     if (!gameStarted || gameOver) return;

// // // //     switch (e.key) {
// // // //       case 'ArrowLeft':
// // // //         e.preventDefault();
// // // //         if (!checkCollision(player, board, { x: -1, y: 0 })) {
// // // //           updatePlayerPos({ x: -1, y: 0, collided: false });
// // // //         }
// // // //         break;
// // // //       case 'ArrowRight':
// // // //         e.preventDefault();
// // // //         if (!checkCollision(player, board, { x: 1, y: 0 })) {
// // // //           updatePlayerPos({ x: 1, y: 0, collided: false });
// // // //         }
// // // //         break;
// // // //       case 'ArrowDown':
// // // //         e.preventDefault();
// // // //         drop();
// // // //         break;
// // // //       case 'ArrowUp':
// // // //         e.preventDefault();
// // // //         playerRotate(board, 1);
// // // //         break;
// // // //       case ' ':
// // // //         e.preventDefault();
// // // //         hardDrop();
// // // //         break;
// // // //       default:
// // // //         break;
// // // //     }
// // // //   }, [board, drop, gameOver, gameStarted, hardDrop, player, playerRotate, updatePlayerPos]);

// // // //   // Auto-drop interval
// // // //   useEffect(() => {
// // // //     if (!dropTime) return;
// // // //     const interval = setInterval(drop, dropTime);
// // // //     return () => clearInterval(interval);  // Cleanup on unmount
// // // //   }, [drop, dropTime]);

// // // //   return (
// // // //     <div
// // // //       role="button"
// // // //       tabIndex="0"
// // // //       onKeyDown={handleKeyDown}
// // // //       ref={gameArea}
// // // //       style={{
// // // //         display: 'flex',
// // // //         justifyContent: 'center',
// // // //         alignItems: 'flex-start',
// // // //         minHeight: '100vh',
// // // //         padding: '40px 20px',
// // // //         background: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 50%, #0a0a1a 100%)',
// // // //         outline: 'none',  // Remove focus outline
// // // //         userSelect: 'none',
// // // //       }}
// // // //     >
// // // //       <Board board={board} />
// // // //       <GameInfo
// // // //         score={score}
// // // //         rows={rows}
// // // //         level={level}
// // // //         gameOver={gameOver}
// // // //         onStart={startGame}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default App;

// // // const React = require('react');
// // // const { useState, useEffect, useCallback, useRef } = require('react');
// // // const Board = require('./components/Board');
// // // const GameInfo = require('./components/GameInfo');
// // // const { usePlayer } = require('./hooks/usePlayer');
// // // const { useBoard } = require('./hooks/useBoard');
// // // const { useGameStatus } = require('./hooks/useGameStatus');
// // // const { checkCollision, createBoard, calcDropSpeed } = require('./utils/gameHelpers');

// // // const App = () => {
// // //   const [dropTime, setDropTime] = useState(null);
// // //   const [gameStarted, setGameStarted] = useState(false);
// // //   const gameArea = useRef();

// // //   const {
// // //     score, setScore,
// // //     rows, setRows,
// // //     level, setLevel,
// // //     gameOver, setGameOver,
// // //     resetGameStatus,
// // //   } = useGameStatus();

// // //   const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
// // //   const [board, setBoard] = useBoard(
// // //     player, resetPlayer, setScore, setRows, setLevel
// // //   );

// // //   const startGame = useCallback(() => {
// // //     setBoard(createBoard());
// // //     resetGameStatus();
// // //     resetPlayer();
// // //     setDropTime(calcDropSpeed(1));
// // //     setGameStarted(true);
// // //     gameArea.current && gameArea.current.focus();
// // //   }, [resetGameStatus, resetPlayer, setBoard]);

// // //   const hardDrop = useCallback(() => {
// // //     let dropY = 0;
// // //     while (!checkCollision(player, board, { x: 0, y: dropY + 1 })) {
// // //       dropY++;
// // //     }
// // //     updatePlayerPos({ x: 0, y: dropY, collided: true });
// // //   }, [player, board, updatePlayerPos]);

// // //   const drop = useCallback(() => {
// // //     if (rows > level * 10) {
// // //       setLevel((prev) => {
// // //         const newLevel = prev + 1;
// // //         setDropTime(calcDropSpeed(newLevel));
// // //         return newLevel;
// // //       });
// // //     }

// // //     if (!checkCollision(player, board, { x: 0, y: 1 })) {
// // //       updatePlayerPos({ x: 0, y: 1, collided: false });
// // //     } else {
// // //       if (player.pos.y < 1) {
// // //         setGameOver(true);
// // //         setDropTime(null);
// // //       } else {
// // //         updatePlayerPos({ x: 0, y: 0, collided: true });
// // //       }
// // //     }
// // //   }, [board, level, player, rows, setGameOver, setLevel, updatePlayerPos]);

// // //   const handleKeyDown = useCallback((e) => {
// // //     if (!gameStarted || gameOver) return;

// // //     if (e.key === 'ArrowLeft') {
// // //       e.preventDefault();
// // //       if (!checkCollision(player, board, { x: -1, y: 0 }))
// // //         updatePlayerPos({ x: -1, y: 0, collided: false });
// // //     } else if (e.key === 'ArrowRight') {
// // //       e.preventDefault();
// // //       if (!checkCollision(player, board, { x: 1, y: 0 }))
// // //         updatePlayerPos({ x: 1, y: 0, collided: false });
// // //     } else if (e.key === 'ArrowDown') {
// // //       e.preventDefault();
// // //       drop();
// // //     } else if (e.key === 'ArrowUp') {
// // //       e.preventDefault();
// // //       playerRotate(board, 1);
// // //     } else if (e.key === ' ') {
// // //       e.preventDefault();
// // //       hardDrop();
// // //     }
// // //   }, [board, drop, gameOver, gameStarted, hardDrop, player, playerRotate, updatePlayerPos]);

// // //   useEffect(() => {
// // //     if (!dropTime) return;
// // //     const interval = setInterval(drop, dropTime);
// // //     return () => clearInterval(interval);
// // //   }, [drop, dropTime]);

// // //   return (
// // //     <div
// // //       role="button"
// // //       tabIndex="0"
// // //       onKeyDown={handleKeyDown}
// // //       ref={gameArea}
// // //       style={{
// // //         display: 'flex',
// // //         justifyContent: 'center',
// // //         alignItems: 'flex-start',
// // //         minHeight: '100vh',
// // //         padding: '40px 20px',
// // //         background: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 50%, #0a0a1a 100%)',
// // //         outline: 'none',
// // //         userSelect: 'none',
// // //       }}
// // //     >
// // //       <Board board={board} />
// // //       <GameInfo
// // //         score={score}
// // //         rows={rows}
// // //         level={level}
// // //         gameOver={gameOver}
// // //         onStart={startGame}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // module.exports = App;

// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import Board from './components/Board';
// // import GameInfo from './components/GameInfo';
// // import { usePlayer } from './hooks/usePlayer';
// // import { useBoard } from './hooks/useBoard';
// // import { useGameStatus } from './hooks/useGameStatus';
// // const { checkCollision, createBoard, calcDropSpeed } = require('./utils/gameHelpers');

// // const App = () => {
// //   const [dropTime, setDropTime]     = useState(null);
// //   const [gameStarted, setGameStarted] = useState(false);
// //   const gameArea = useRef();

// //   const {
// //     score, setScore, rows, setRows,
// //     level, setLevel, gameOver, setGameOver, resetGameStatus,
// //   } = useGameStatus();

// //   const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
// //   const [board, setBoard] = useBoard(player, resetPlayer, setScore, setRows, setLevel);

// //   const startGame = useCallback(() => {
// //     setBoard(createBoard());
// //     resetGameStatus();
// //     resetPlayer();
// //     setDropTime(calcDropSpeed(1));
// //     setGameStarted(true);
// //     if (gameArea.current) gameArea.current.focus();
// //   }, [resetGameStatus, resetPlayer, setBoard]);

// //   const hardDrop = useCallback(() => {
// //     let dy = 0;
// //     while (!checkCollision(player, board, { x: 0, y: dy + 1 })) dy++;
// //     updatePlayerPos({ x: 0, y: dy, collided: true });
// //   }, [player, board, updatePlayerPos]);

// //   const drop = useCallback(() => {
// //     if (rows > level * 10) {
// //       setLevel((prev) => {
// //         const next = prev + 1;
// //         setDropTime(calcDropSpeed(next));
// //         return next;
// //       });
// //     }
// //     if (!checkCollision(player, board, { x: 0, y: 1 })) {
// //       updatePlayerPos({ x: 0, y: 1, collided: false });
// //     } else {
// //       if (player.pos.y < 1) {
// //         setGameOver(true);
// //         setDropTime(null);
// //       } else {
// //         updatePlayerPos({ x: 0, y: 0, collided: true });
// //       }
// //     }
// //   }, [board, level, player, rows, setGameOver, setLevel, updatePlayerPos]);

// //   const handleKeyDown = useCallback((e) => {
// //     if (!gameStarted || gameOver) return;
// //     const actions = {
// //       ArrowLeft:  () => { if (!checkCollision(player, board, { x: -1, y: 0 })) updatePlayerPos({ x: -1, y: 0, collided: false }); },
// //       ArrowRight: () => { if (!checkCollision(player, board, { x:  1, y: 0 })) updatePlayerPos({ x:  1, y: 0, collided: false }); },
// //       ArrowDown:  () => drop(),
// //       ArrowUp:    () => playerRotate(board, 1),
// //       ' ':        () => hardDrop(),
// //     };
// //     if (actions[e.key]) { e.preventDefault(); actions[e.key](); }
// //   }, [board, drop, gameOver, gameStarted, hardDrop, player, playerRotate, updatePlayerPos]);

// //   useEffect(() => {
// //     if (!dropTime) return;
// //     const id = setInterval(drop, dropTime);
// //     return () => clearInterval(id);
// //   }, [drop, dropTime]);

// //   return (
// //     <div
// //       role="button"
// //       tabIndex="0"
// //       onKeyDown={handleKeyDown}
// //       ref={gameArea}
// //       style={{
// //         display: 'flex',
// //         justifyContent: 'center',
// //         alignItems: 'flex-start',
// //         minHeight: '100vh',
// //         padding: '40px 20px',
// //         background: 'linear-gradient(135deg,#0a0a1a 0%,#0d0d2b 50%,#0a0a1a 100%)',
// //         outline: 'none',
// //         userSelect: 'none',
// //       }}
// //     >
// //       <Board board={board} />
// //       <GameInfo
// //         score={score} rows={rows} level={level}
// //         gameOver={gameOver} onStart={startGame}
// //       />
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Board from './components/Board';
// import GameInfo from './components/GameInfo';
// import { usePlayer } from './hooks/usePlayer';
// import { useBoard } from './hooks/useBoard';
// import { useGameStatus } from './hooks/useGameStatus';
// const {
//   checkCollision, createBoard, calcDropSpeed,
// } = require('./utils/gameHelpers');

// const App = () => {
//   const [dropTime, setDropTime]       = useState(null);
//   const [gameStarted, setGameStarted] = useState(false);
//   const gameArea = useRef();

//   // Use a ref for dropTime so the interval callback always
//   // reads the latest value without needing to be recreated
//   const dropTimeRef = useRef(dropTime);
//   useEffect(() => { dropTimeRef.current = dropTime; }, [dropTime]);

//   const {
//     score, setScore,
//     rows,  setRows,
//     level, setLevel,
//     gameOver, setGameOver,
//     resetGameStatus,
//   } = useGameStatus();

//   const {
//     player, updatePlayerPos, resetPlayer, playerRotate,
//   } = usePlayer();

//   const [board, setBoard] = useBoard(
//     player, resetPlayer, setScore, setRows, setLevel,
//   );

//   // ── Start / Restart ──────────────────────────────────────
//   const startGame = useCallback(() => {
//     setBoard(createBoard());
//     resetGameStatus();
//     resetPlayer();
//     setDropTime(calcDropSpeed(1));
//     setGameStarted(true);
//     setTimeout(() => {
//       if (gameArea.current) gameArea.current.focus();
//     }, 50);
//   }, [resetGameStatus, resetPlayer, setBoard]);

//   // ── Hard drop ─────────────────────────────────────────────
//   const hardDrop = useCallback(() => {
//     let dy = 0;
//     while (!checkCollision(player, board, { x: 0, y: dy + 1 })) dy++;
//     updatePlayerPos({ x: 0, y: dy, collided: true });
//   }, [player, board, updatePlayerPos]);

//   // ── Soft / auto drop ─────────────────────────────────────
//   const dropRef = useRef(null);

//   dropRef.current = () => {
//     // Level up every 10 rows
//     if (rows > level * 10) {
//       setLevel((prev) => {
//         const next = prev + 1;
//         setDropTime(calcDropSpeed(next));
//         return next;
//       });
//     }

//     if (!checkCollision(player, board, { x: 0, y: 1 })) {
//       updatePlayerPos({ x: 0, y: 1, collided: false });
//     } else {
//       if (player.pos.y < 1) {
//         // Piece collided at very top → game over
//         setGameOver(true);
//         setDropTime(null);
//       } else {
//         updatePlayerPos({ x: 0, y: 0, collided: true });
//       }
//     }
//   };

//   // ── Auto-drop interval ───────────────────────────────────
//   // Using a ref-based drop so setInterval never needs to change
//   useEffect(() => {
//     if (!dropTime || gameOver) return;
//     const id = setInterval(() => {
//       dropRef.current();
//     }, dropTime);
//     return () => clearInterval(id);
//   }, [dropTime, gameOver]);

//   // ── Keyboard handler ─────────────────────────────────────
//   const handleKeyDown = useCallback((e) => {
//     if (!gameStarted || gameOver) return;

//     switch (e.key) {
//       case 'ArrowLeft':
//         e.preventDefault();
//         if (!checkCollision(player, board, { x: -1, y: 0 }))
//           updatePlayerPos({ x: -1, y: 0, collided: false });
//         break;
//       case 'ArrowRight':
//         e.preventDefault();
//         if (!checkCollision(player, board, { x: 1, y: 0 }))
//           updatePlayerPos({ x: 1, y: 0, collided: false });
//         break;
//       case 'ArrowDown':
//         e.preventDefault();
//         dropRef.current();
//         break;
//       case 'ArrowUp':
//         e.preventDefault();
//         playerRotate(board, 1);
//         break;
//       case ' ':
//         e.preventDefault();
//         hardDrop();
//         break;
//       default:
//         break;
//     }
//   }, [board, gameOver, gameStarted, hardDrop, player, playerRotate, updatePlayerPos]);

//   // ── Render ────────────────────────────────────────────────
//   return (
//     <div
//       role="button"
//       tabIndex="0"
//       onKeyDown={handleKeyDown}
//       ref={gameArea}
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         minHeight: '100vh',
//         padding: '40px 20px',
//         background: 'linear-gradient(135deg,#0a0a1a 0%,#0d0d2b 50%,#0a0a1a 100%)',
//         outline: 'none',
//         userSelect: 'none',
//       }}
//     >
//       <Board board={board} />
//       <GameInfo
//         score={score}
//         rows={rows}
//         level={level}
//         gameOver={gameOver}
//         onStart={startGame}
//       />
//     </div>
//   );
// };

// export default App;

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

// ─── Constants ───────────────────────────────────────────────
const COLS   = 10;
const ROWS   = 20;
const BLOCK  = 28;

const SHAPES = {
  I: { shape: [[1,1,1,1]],                          color: '#00F0F0' },
  O: { shape: [[1,1],[1,1]],                         color: '#F0F000' },
  T: { shape: [[0,1,0],[1,1,1]],                     color: '#A000F0' },
  S: { shape: [[0,1,1],[1,1,0]],                     color: '#00F000' },
  Z: { shape: [[1,1,0],[0,1,1]],                     color: '#F00000' },
  J: { shape: [[1,0,0],[1,1,1]],                     color: '#0000F0' },
  L: { shape: [[0,0,1],[1,1,1]],                     color: '#F0A000' },
};

const KEYS = Object.keys(SHAPES);

const POINTS = { 1: 40, 2: 100, 3: 300, 4: 1200 };

const DROP_SPEED = (level) => Math.max(80, 800 - (level - 1) * 80);

// ─── Pure helpers ────────────────────────────────────────────
const emptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const randomPiece = () => {
  const key   = KEYS[Math.floor(Math.random() * KEYS.length)];
  const def   = SHAPES[key];
  return {
    shape: def.shape,
    color: def.color,
    x: Math.floor(COLS / 2) - Math.floor(def.shape[0].length / 2),
    y: 0,
  };
};

const rotate = (shape) => {
  const rows = shape.length;
  const cols = shape[0].length;
  const result = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      result[c][rows - 1 - r] = shape[r][c];
  return result;
};

const fits = (board, shape, x, y) => {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = x + c;
      const ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
      if (ny >= 0 && board[ny][nx])          return false;
    }
  }
  return true;
};

const merge = (board, piece) => {
  const b = board.map((row) => [...row]);
  piece.shape.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val) {
        const ny = piece.y + r;
        const nx = piece.x + c;
        if (ny >= 0) b[ny][nx] = piece.color;
      }
    });
  });
  return b;
};

const clearLines = (board) => {
  const kept    = board.filter((row) => row.some((c) => !c));
  const cleared = ROWS - kept.length;
  const empty   = Array.from({ length: cleared }, () => Array(COLS).fill(null));
  return { board: [...empty, ...kept], cleared };
};

// ─── Cell ────────────────────────────────────────────────────
const Cell = React.memo(({ color }) => (
  <div style={{
    width:  BLOCK,
    height: BLOCK,
    boxSizing: 'border-box',
    background: color || 'rgba(255,255,255,0.03)',
    border: color
      ? `3px solid`
      : '1px solid rgba(255,255,255,0.06)',
    borderColor: color
      ? `${color}ff ${color}55 ${color}55 ${color}ff`
      : undefined,
    borderRadius: color ? 3 : 0,
    boxShadow: color
      ? `inset 0 0 6px rgba(255,255,255,0.25), 0 0 4px ${color}88`
      : 'none',
  }} />
));

// ─── Board display ───────────────────────────────────────────
const BoardDisplay = React.memo(({ cells }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${COLS}, ${BLOCK}px)`,
    gridTemplateRows:    `repeat(${ROWS}, ${BLOCK}px)`,
    border: '2px solid rgba(255,255,255,0.15)',
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: '0 0 40px rgba(0,0,0,0.8)',
  }}>
    {cells.map((color, i) => <Cell key={i} color={color} />)}
  </div>
));

// ─── Sidebar ─────────────────────────────────────────────────
const Sidebar = ({ score, level, rows, gameOver, started, onStart }) => (
  <div style={{
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', marginLeft: 24, width: 140,
  }}>
    <div style={{
      color: '#00F0F0', fontSize: 26, fontWeight: 'bold',
      letterSpacing: 4, marginBottom: 24,
      textShadow: '0 0 20px #00F0F0',
      fontFamily: 'monospace',
    }}>
      TETRIS
    </div>

    {[['SCORE', score], ['LEVEL', level], ['LINES', rows]].map(([l, v]) => (
      <div key={l} style={{
        width: '100%', background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, padding: '10px 0',
        textAlign: 'center', marginBottom: 10,
      }}>
        <div style={{
          color: 'rgba(255,255,255,0.45)', fontSize: 11,
          letterSpacing: 2, textTransform: 'uppercase',
        }}>{l}</div>
        <div style={{
          color: '#00F0F0', fontSize: 22,
          fontWeight: 'bold', fontFamily: 'monospace',
        }}>{v}</div>
      </div>
    ))}

    {gameOver && (
      <div style={{
        color: '#F00000', fontWeight: 'bold',
        fontSize: 16, marginBottom: 10,
        textShadow: '0 0 10px #F00000',
      }}>
        GAME OVER
      </div>
    )}

    <button
      onClick={onStart}
      style={{
        marginTop: 8, padding: '12px 0', width: '100%',
        background: 'rgba(0,240,240,0.15)',
        border: '1px solid rgba(0,240,240,0.5)',
        borderRadius: 8, color: '#00F0F0',
        fontSize: 13, fontWeight: 'bold',
        letterSpacing: 2, cursor: 'pointer',
      }}
    >
      {!started ? '▶ START' : gameOver ? '▶ RESTART' : '⟳ RESET'}
    </button>

    <div style={{
      marginTop: 20, color: 'rgba(255,255,255,0.25)',
      fontSize: 11, textAlign: 'center', lineHeight: 2,
    }}>
      <div>← → Move</div>
      <div>↑ Rotate</div>
      <div>↓ Soft drop</div>
      <div>Space Hard drop</div>
    </div>
  </div>
);

// ─── Main App ────────────────────────────────────────────────
export default function App() {
  // Visible React state — only what the UI needs to re-render
  const [display, setDisplay]   = useState(() => emptyBoard());
  const [score,   setScore]     = useState(0);
  const [level,   setLevel]     = useState(1);
  const [rows,    setRows]      = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started,  setStarted]  = useState(false);

  // All mutable game state lives in refs — no re-render on change
  const boardRef  = useRef(emptyBoard());   // locked cells
  const pieceRef  = useRef(null);           // current falling piece
  const scoreRef  = useRef(0);
  const levelRef  = useRef(1);
  const rowsRef   = useRef(0);
  const aliveRef  = useRef(false);          // is game running?
  const timerRef  = useRef(null);           // drop interval id
  const gameArea  = useRef();

  // ── Render: merge locked board + current piece into display ──
  const render = useCallback(() => {
    const base = boardRef.current;
    const p    = pieceRef.current;

    // Flatten board to 1-D array for React grid
    const cells = base.map((row) => [...row]);

    // Paint current piece on top
    if (p) {
      p.shape.forEach((row, r) => {
        row.forEach((val, c) => {
          if (!val) return;
          const ny = p.y + r;
          const nx = p.x + c;
          if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS)
            cells[ny][nx] = p.color;
        });
      });
    }

    setDisplay(cells.flat());   // flat → 1-D for grid
  }, []);

  // ── Spawn next piece ─────────────────────────────────────
  const spawn = useCallback(() => {
    const p = randomPiece();
    if (!fits(boardRef.current, p.shape, p.x, p.y)) {
      // Cannot place new piece → game over
      aliveRef.current = false;
      clearInterval(timerRef.current);
      setGameOver(true);
      return;
    }
    pieceRef.current = p;
    render();
  }, [render]);

  // ── Lock current piece, clear lines, spawn next ──────────
  const lock = useCallback(() => {
    const merged = merge(boardRef.current, pieceRef.current);
    const { board: swept, cleared } = clearLines(merged);

    boardRef.current = swept;

    if (cleared > 0) {
      const gained   = (POINTS[cleared] || 0) * levelRef.current;
      scoreRef.current += gained;
      rowsRef.current  += cleared;
      levelRef.current  = Math.floor(rowsRef.current / 10) + 1;

      setScore(scoreRef.current);
      setRows(rowsRef.current);
      setLevel(levelRef.current);

      // Update drop speed for new level
      clearInterval(timerRef.current);
      timerRef.current = setInterval(tick, DROP_SPEED(levelRef.current));
    }

    spawn();
  }, [spawn]);                   // tick defined below via ref

  // ── One gravity tick — move piece down one row ────────────
  const tickRef = useRef(null);

  tickRef.current = () => {
    if (!aliveRef.current) return;
    const p = pieceRef.current;
    if (!p) return;

    if (fits(boardRef.current, p.shape, p.x, p.y + 1)) {
      pieceRef.current = { ...p, y: p.y + 1 };
      render();
    } else {
      lock();
    }
  };

  const tick = () => tickRef.current();

  // ── Start / restart game ──────────────────────────────────
  const startGame = useCallback(() => {
    // Reset all refs
    boardRef.current  = emptyBoard();
    scoreRef.current  = 0;
    levelRef.current  = 1;
    rowsRef.current   = 0;
    aliveRef.current  = true;

    // Reset React state
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
    setStarted(true);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(tick, DROP_SPEED(1));

    spawn();

    setTimeout(() => gameArea.current?.focus(), 50);
  }, [spawn]);

  // ── Keyboard controls ─────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (!aliveRef.current) return;
    const p = pieceRef.current;
    if (!p) return;

    switch (e.key) {
      case 'ArrowLeft': {
        e.preventDefault();
        if (fits(boardRef.current, p.shape, p.x - 1, p.y)) {
          pieceRef.current = { ...p, x: p.x - 1 };
          render();
        }
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (fits(boardRef.current, p.shape, p.x + 1, p.y)) {
          pieceRef.current = { ...p, x: p.x + 1 };
          render();
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const rotated = rotate(p.shape);
        // Wall kick: try original x, then nudge left/right
        for (const dx of [0, -1, 1, -2, 2]) {
          if (fits(boardRef.current, rotated, p.x + dx, p.y)) {
            pieceRef.current = { ...p, shape: rotated, x: p.x + dx };
            render();
            break;
          }
        }
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        tickRef.current();
        break;
      }
      case ' ': {
        e.preventDefault();
        // Hard drop
        let dy = 0;
        while (fits(boardRef.current, p.shape, p.x, p.y + dy + 1)) dy++;
        pieceRef.current = { ...p, y: p.y + dy };
        render();
        // Small delay so player sees piece before it locks
        setTimeout(() => lock(), 30);
        break;
      }
      default: break;
    }
  }, [render, lock]);

  // ── Cleanup on unmount ────────────────────────────────────
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // ── Build display grid ────────────────────────────────────
  // display is already flat (length = ROWS * COLS)
  const flatDisplay = Array.isArray(display[0]) ? display.flat() : display;

  return (
    <div
      ref={gameArea}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        padding: '40px 20px',
        background: 'linear-gradient(135deg,#0a0a1a,#0d0d2b,#0a0a1a)',
        outline: 'none',
        userSelect: 'none',
      }}
    >
      <BoardDisplay cells={flatDisplay} />
      <Sidebar
        score={score} level={level} rows={rows}
        gameOver={gameOver} started={started}
        onStart={startGame}
      />
    </div>
  );
}
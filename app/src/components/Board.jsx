// // // // /**
// // // //  * Board.jsx — The 10x20 Tetris grid
// // // //  */

// // // // import React from 'react';
// // // // import Cell from './Cell';

// // // // const Board = ({ board }) => {
// // // //   const boardStyle = {
// // // //     display: 'grid',
// // // //     gridTemplateColumns: `repeat(10, calc(var(--board-width) / 10))`,
// // // //     gridTemplateRows: `repeat(20, calc(var(--board-height) / 20))`,
// // // //     '--board-width': '240px',
// // // //     '--board-height': '480px',
// // // //     width: '240px',
// // // //     height: '480px',
// // // //     border: '2px solid rgba(255,255,255,0.2)',
// // // //     borderRadius: '4px',
// // // //     background: 'rgba(0,0,0,0.5)',
// // // //     boxShadow: '0 0 30px rgba(0,0,0,0.8)',
// // // //   };

// // // //   return (
// // // //     <div style={boardStyle}>
// // // //       {board.map((row, y) =>
// // // //         row.map((cell, x) => (
// // // //           <Cell
// // // //             key={`${y}-${x}`}
// // // //             type={cell[1]}
// // // //             color={cell[0] !== 0 ? '80, 227, 230' : undefined}
// // // //           />
// // // //         ))
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default React.memo(Board);

// // // const React = require('react');
// // // const Cell = require('./Cell');

// // // const Board = ({ board }) => {
// // //   const boardStyle = {
// // //     display: 'grid',
// // //     gridTemplateColumns: 'repeat(10, 24px)',
// // //     gridTemplateRows: 'repeat(20, 24px)',
// // //     width: '240px',
// // //     height: '480px',
// // //     border: '2px solid rgba(255,255,255,0.2)',
// // //     borderRadius: '4px',
// // //     background: 'rgba(0,0,0,0.5)',
// // //     boxShadow: '0 0 30px rgba(0,0,0,0.8)',
// // //   };

// // //   return (
// // //     <div style={boardStyle}>
// // //       {board.map((row, y) =>
// // //         row.map((cell, x) => (
// // //           <Cell
// // //             key={`${y}-${x}`}
// // //             type={cell[1]}
// // //             color={cell[0] !== 0 ? '80, 227, 230' : '0,0,0'}
// // //           />
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // module.exports = React.memo(Board);

// // import React, { memo } from 'react';
// // import Cell from './Cell';

// // const Board = ({ board }) => (
// //   <div style={{
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(10, 24px)',
// //     gridTemplateRows: 'repeat(20, 24px)',
// //     width: '240px',
// //     height: '480px',
// //     border: '2px solid rgba(255,255,255,0.2)',
// //     borderRadius: '4px',
// //     background: 'rgba(0,0,0,0.5)',
// //     boxShadow: '0 0 30px rgba(0,0,0,0.8)',
// //   }}>
// //     {board.map((row, y) =>
// //       row.map((cell, x) => (
// //         <Cell
// //           key={`${y}-${x}`}
// //           type={cell[1]}
// //           color={cell[0] !== 0 ? '80,227,230' : '0,0,0'}
// //         />
// //       ))
// //     )}
// //   </div>
// // );

// // export default memo(Board);

// import React, { memo } from 'react';
// import Cell from './Cell';

// const Board = ({ board }) => (
//   <div style={{
//     display: 'grid',
//     gridTemplateColumns: 'repeat(10, 24px)',
//     gridTemplateRows: 'repeat(20, 24px)',
//     width: '240px',
//     height: '480px',
//     border: '2px solid rgba(255,255,255,0.2)',
//     borderRadius: '4px',
//     background: 'rgba(0,0,0,0.5)',
//     boxShadow: '0 0 30px rgba(0,0,0,0.8)',
//   }}>
//     {board.map((row, y) =>
//       row.map((cell, x) => (
//         <Cell
//           key={`${y}-${x}`}
//           type={cell[1]}
//           color={cell[2] || '80,227,230'}
//         />
//       ))
//     )}
//   </div>
// );

// export default memo(Board);
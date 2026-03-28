// // // /**
// // //  * GameInfo.jsx — Displays score, level, rows
// // //  */

// // // import React from 'react';

// // // const InfoBox = ({ label, value }) => (
// // //   <div style={{
// // //     background: 'rgba(255,255,255,0.05)',
// // //     border: '1px solid rgba(255,255,255,0.1)',
// // //     borderRadius: '8px',
// // //     padding: '12px 20px',
// // //     marginBottom: '12px',
// // //     width: '120px',
// // //     textAlign: 'center',
// // //   }}>
// // //     <div style={{
// // //       color: 'rgba(255,255,255,0.5)',
// // //       fontSize: '12px',
// // //       textTransform: 'uppercase',
// // //       letterSpacing: '2px',
// // //       marginBottom: '4px',
// // //     }}>
// // //       {label}
// // //     </div>
// // //     <div style={{
// // //       color: '#80E3E6',
// // //       fontSize: '24px',
// // //       fontWeight: 'bold',
// // //       fontFamily: 'monospace',
// // //     }}>
// // //       {value}
// // //     </div>
// // //   </div>
// // // );

// // // const GameInfo = ({ score, rows, level, gameOver, onStart }) => (
// // //   <div style={{
// // //     display: 'flex',
// // //     flexDirection: 'column',
// // //     alignItems: 'center',
// // //     padding: '20px',
// // //     marginLeft: '20px',
// // //   }}>
// // //     <div style={{
// // //       color: '#80E3E6',
// // //       fontSize: '28px',
// // //       fontWeight: 'bold',
// // //       letterSpacing: '4px',
// // //       marginBottom: '20px',
// // //       textShadow: '0 0 20px rgba(80,227,230,0.8)',
// // //       fontFamily: 'monospace',
// // //     }}>
// // //       TETRIS
// // //     </div>

// // //     <InfoBox label="Score" value={score} />
// // //     <InfoBox label="Level" value={level} />
// // //     <InfoBox label="Rows" value={rows} />

// // //     {gameOver && (
// // //       <div style={{
// // //         color: '#E34E4E',
// // //         fontSize: '18px',
// // //         fontWeight: 'bold',
// // //         textAlign: 'center',
// // //         marginBottom: '12px',
// // //         textShadow: '0 0 10px rgba(227,78,78,0.8)',
// // //       }}>
// // //         GAME OVER
// // //       </div>
// // //     )}

// // //     <button
// // //       onClick={onStart}
// // //       style={{
// // //         marginTop: '12px',
// // //         padding: '12px 24px',
// // //         background: 'linear-gradient(135deg, rgba(80,227,230,0.3), rgba(80,227,230,0.1))',
// // //         border: '1px solid rgba(80,227,230,0.5)',
// // //         borderRadius: '8px',
// // //         color: '#80E3E6',
// // //         fontSize: '14px',
// // //         fontWeight: 'bold',
// // //         letterSpacing: '2px',
// // //         cursor: 'pointer',
// // //         textTransform: 'uppercase',
// // //         transition: 'all 0.2s ease',
// // //       }}
// // //       onMouseOver={(e) => {
// // //         e.target.style.background = 'rgba(80,227,230,0.3)';
// // //         e.target.style.boxShadow = '0 0 15px rgba(80,227,230,0.4)';
// // //       }}
// // //       onMouseOut={(e) => {
// // //         e.target.style.background = 'linear-gradient(135deg, rgba(80,227,230,0.3), rgba(80,227,230,0.1))';
// // //         e.target.style.boxShadow = 'none';
// // //       }}
// // //     >
// // //       {gameOver ? '▶ Restart' : '▶ Start'}
// // //     </button>

// // //     <div style={{
// // //       marginTop: '20px',
// // //       color: 'rgba(255,255,255,0.3)',
// // //       fontSize: '11px',
// // //       textAlign: 'center',
// // //       lineHeight: '1.6',
// // //     }}>
// // //       <div>← → Move</div>
// // //       <div>↑ Rotate</div>
// // //       <div>↓ Soft Drop</div>
// // //       <div>Space Hard Drop</div>
// // //     </div>
// // //   </div>
// // // );

// // // export default GameInfo;

// // const React = require('react');

// // const InfoBox = ({ label, value }) => (
// //   <div style={{
// //     background: 'rgba(255,255,255,0.05)',
// //     border: '1px solid rgba(255,255,255,0.1)',
// //     borderRadius: '8px',
// //     padding: '12px 20px',
// //     marginBottom: '12px',
// //     width: '120px',
// //     textAlign: 'center',
// //   }}>
// //     <div style={{
// //       color: 'rgba(255,255,255,0.5)',
// //       fontSize: '12px',
// //       textTransform: 'uppercase',
// //       letterSpacing: '2px',
// //       marginBottom: '4px',
// //     }}>
// //       {label}
// //     </div>
// //     <div style={{
// //       color: '#80E3E6',
// //       fontSize: '24px',
// //       fontWeight: 'bold',
// //       fontFamily: 'monospace',
// //     }}>
// //       {value}
// //     </div>
// //   </div>
// // );

// // const GameInfo = ({ score, rows, level, gameOver, onStart }) => (
// //   <div style={{
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     padding: '20px',
// //     marginLeft: '20px',
// //   }}>
// //     <div style={{
// //       color: '#80E3E6',
// //       fontSize: '28px',
// //       fontWeight: 'bold',
// //       letterSpacing: '4px',
// //       marginBottom: '20px',
// //       textShadow: '0 0 20px rgba(80,227,230,0.8)',
// //       fontFamily: 'monospace',
// //     }}>
// //       TETRIS
// //     </div>

// //     <InfoBox label="Score" value={score} />
// //     <InfoBox label="Level" value={level} />
// //     <InfoBox label="Rows"  value={rows}  />

// //     {gameOver && (
// //       <div style={{
// //         color: '#E34E4E',
// //         fontSize: '18px',
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //         marginBottom: '12px',
// //         textShadow: '0 0 10px rgba(227,78,78,0.8)',
// //       }}>
// //         GAME OVER
// //       </div>
// //     )}

// //     <button
// //       onClick={onStart}
// //       style={{
// //         marginTop: '12px',
// //         padding: '12px 24px',
// //         background: 'linear-gradient(135deg, rgba(80,227,230,0.3), rgba(80,227,230,0.1))',
// //         border: '1px solid rgba(80,227,230,0.5)',
// //         borderRadius: '8px',
// //         color: '#80E3E6',
// //         fontSize: '14px',
// //         fontWeight: 'bold',
// //         letterSpacing: '2px',
// //         cursor: 'pointer',
// //         textTransform: 'uppercase',
// //       }}
// //     >
// //       {gameOver ? '▶ Restart' : '▶ Start'}
// //     </button>

// //     <div style={{
// //       marginTop: '20px',
// //       color: 'rgba(255,255,255,0.3)',
// //       fontSize: '11px',
// //       textAlign: 'center',
// //       lineHeight: '1.8',
// //     }}>
// //       <div>← → Move</div>
// //       <div>↑ Rotate</div>
// //       <div>↓ Soft Drop</div>
// //       <div>Space Hard Drop</div>
// //     </div>
// //   </div>
// // );

// // module.exports = GameInfo;

// import React from 'react';

// const InfoBox = ({ label, value }) => (
//   <div style={{
//     background: 'rgba(255,255,255,0.05)',
//     border: '1px solid rgba(255,255,255,0.1)',
//     borderRadius: '8px',
//     padding: '12px 20px',
//     marginBottom: '12px',
//     width: '120px',
//     textAlign: 'center',
//   }}>
//     <div style={{
//       color: 'rgba(255,255,255,0.5)',
//       fontSize: '12px',
//       textTransform: 'uppercase',
//       letterSpacing: '2px',
//       marginBottom: '4px',
//     }}>
//       {label}
//     </div>
//     <div style={{
//       color: '#80E3E6',
//       fontSize: '24px',
//       fontWeight: 'bold',
//       fontFamily: 'monospace',
//     }}>
//       {value}
//     </div>
//   </div>
// );

// const GameInfo = ({ score, rows, level, gameOver, onStart }) => (
//   <div style={{
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     marginLeft: '20px',
//   }}>
//     <div style={{
//       color: '#80E3E6',
//       fontSize: '28px',
//       fontWeight: 'bold',
//       letterSpacing: '4px',
//       marginBottom: '20px',
//       textShadow: '0 0 20px rgba(80,227,230,0.8)',
//       fontFamily: 'monospace',
//     }}>
//       TETRIS
//     </div>

//     <InfoBox label="Score" value={score} />
//     <InfoBox label="Level" value={level} />
//     <InfoBox label="Rows"  value={rows}  />

//     {gameOver && (
//       <div style={{
//         color: '#E34E4E',
//         fontSize: '18px',
//         fontWeight: 'bold',
//         marginBottom: '12px',
//         textShadow: '0 0 10px rgba(227,78,78,0.8)',
//       }}>
//         GAME OVER
//       </div>
//     )}

//     <button
//       onClick={onStart}
//       style={{
//         marginTop: '12px',
//         padding: '12px 24px',
//         background: 'linear-gradient(135deg,rgba(80,227,230,0.3),rgba(80,227,230,0.1))',
//         border: '1px solid rgba(80,227,230,0.5)',
//         borderRadius: '8px',
//         color: '#80E3E6',
//         fontSize: '14px',
//         fontWeight: 'bold',
//         letterSpacing: '2px',
//         cursor: 'pointer',
//         textTransform: 'uppercase',
//       }}
//     >
//       {gameOver ? '▶ Restart' : '▶ Start'}
//     </button>

//     <div style={{
//       marginTop: '20px',
//       color: 'rgba(255,255,255,0.3)',
//       fontSize: '11px',
//       textAlign: 'center',
//       lineHeight: '1.8',
//     }}>
//       <div>← → Move</div>
//       <div>↑ Rotate</div>
//       <div>↓ Soft Drop</div>
//       <div>Space Hard Drop</div>
//     </div>
//   </div>
// );

// export default GameInfo;
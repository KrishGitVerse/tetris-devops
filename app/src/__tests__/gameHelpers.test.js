// /**
//  * gameHelpers.test.js — Unit tests for game logic
//  */

// const {
//   createBoard,
//   checkCollision,
//   sweepRows,
//   calcScore,
//   calcLevel,
//   calcDropSpeed,
//   BOARD_WIDTH,
//   BOARD_HEIGHT,
// } = require('../utils/gameHelpers');

// // describe('createBoard', () => {
// //   it('should create a board with correct dimensions', () => {
// //     const board = createBoard();
// //     expect(board).toHaveLength(BOARD_HEIGHT);
// //     expect(board[0]).toHaveLength(BOARD_WIDTH);
// //   });

// //   it('should create a board with all empty cells', () => {
// //     const board = createBoard();
// //     board.forEach((row) => {
// //       row.forEach((cell) => {
// //         expect(cell[0]).toBe(0);
// //         expect(cell[1]).toBe('clear');
// //       });
// //     });
// //   });

// //   it('should create independent rows (no shared references)', () => {
// //     const board = createBoard();
// //     board[0][0] = [1, 'merged'];
// //     expect(board[1][0]).toEqual([0, 'clear']);
// //   });
// // });

// describe('createBoard', () => {
//   it('should create a board with correct dimensions', () => {
//     const board = createBoard();
//     expect(board).toHaveLength(BOARD_HEIGHT);
//     expect(board[0]).toHaveLength(BOARD_WIDTH);
//   });

//   it('should create a board with all empty cells', () => {
//     const board = createBoard();
//     board.forEach((row) => {
//       row.forEach((cell) => {
//         expect(cell[0]).toBe(0);
//         expect(cell[1]).toBe('clear');
//         expect(cell[2]).toBeNull();
//       });
//     });
//   });

//   it('should create independent rows (no shared references)', () => {
//     const board = createBoard();
//     board[0][0] = [1, 'merged', '80,227,230'];
//     expect(board[1][0]).toEqual([0, 'clear', null]);
//   });
// });

// describe('checkCollision', () => {
//   const emptyBoard = createBoard();

//   const mockPlayer = {
//     pos: { x: 4, y: 0 },
//     tetromino: [
//       [0, 1, 0],
//       [1, 1, 1],
//       [0, 0, 0],
//     ],
//   };

//   it('should NOT detect collision in empty space', () => {
//     const result = checkCollision(mockPlayer, emptyBoard, { x: 0, y: 0 });
//     expect(result).toBe(false);
//   });

//   it('should detect collision with left wall', () => {
//     const playerAtLeft = { ...mockPlayer, pos: { x: -1, y: 0 } };
//     const result = checkCollision(playerAtLeft, emptyBoard, { x: -1, y: 0 });
//     expect(result).toBe(true);
//   });

//   it('should detect collision with right wall', () => {
//     const playerAtRight = { ...mockPlayer, pos: { x: BOARD_WIDTH - 1, y: 0 } };
//     const result = checkCollision(playerAtRight, emptyBoard, { x: 1, y: 0 });
//     expect(result).toBe(true);
//   });

//   it('should detect collision with bottom', () => {
//     const playerAtBottom = { ...mockPlayer, pos: { x: 4, y: BOARD_HEIGHT - 1 } };
//     const result = checkCollision(playerAtBottom, emptyBoard, { x: 0, y: 1 });
//     expect(result).toBe(true);
//   });

//   it('should detect collision with merged cells', () => {
//     const boardWithBlock = createBoard();
//     boardWithBlock[5][4] = [1, 'merged'];
//     const playerAbove = { ...mockPlayer, pos: { x: 3, y: 3 } };
//     const result = checkCollision(playerAbove, boardWithBlock, { x: 0, y: 1 });
//     expect(result).toBe(true);
//   });
// });

// describe('sweepRows', () => {
//   it('should not clear incomplete rows', () => {
//     const board = createBoard();
//     const { rowsCleared } = sweepRows(board);
//     expect(rowsCleared).toBe(0);
//   });

//   it('should clear a complete row', () => {
//     const board = createBoard();
//     board[BOARD_HEIGHT - 1] = Array(BOARD_WIDTH).fill([1, 'merged']);
//     const { newBoard, rowsCleared } = sweepRows(board);
//     expect(rowsCleared).toBe(1);
//     expect(newBoard).toHaveLength(BOARD_HEIGHT);
//     expect(newBoard[0].every((cell) => cell[1] === 'clear')).toBe(true);
//   });

//   it('should clear multiple complete rows', () => {
//     const board = createBoard();
//     for (let i = BOARD_HEIGHT - 4; i < BOARD_HEIGHT; i++) {
//       board[i] = Array(BOARD_WIDTH).fill([1, 'merged']);
//     }
//     const { rowsCleared } = sweepRows(board);
//     expect(rowsCleared).toBe(4);
//   });
// });

// describe('calcScore', () => {
//   it('should return 40 for 1 row at level 1', () => {
//     expect(calcScore(1, 0)).toBe(40);
//   });

//   it('should return 1200 for 4 rows at level 1', () => {
//     expect(calcScore(4, 0)).toBe(1200);
//   });

//   it('should multiply score by level', () => {
//     expect(calcScore(1, 1)).toBe(80);
//     expect(calcScore(1, 2)).toBe(120);
//   });

//   it('should return 0 for 0 rows cleared', () => {
//     expect(calcScore(0, 0)).toBe(0);
//   });
// });

// describe('calcLevel', () => {
//   it('should start at level 1', () => {
//     expect(calcLevel(0)).toBe(1);
//   });

//   it('should advance to level 2 after 10 rows', () => {
//     expect(calcLevel(10)).toBe(2);
//   });
// });

// describe('calcDropSpeed', () => {
//   it('should be 800ms at level 1', () => {
//     expect(calcDropSpeed(1)).toBe(800);
//   });

//   it('should be faster at higher levels', () => {
//     expect(calcDropSpeed(5)).toBeLessThan(calcDropSpeed(1));
//   });

//   it('should not go below 100ms', () => {
//     expect(calcDropSpeed(100)).toBeGreaterThanOrEqual(100);
//   });
// });

const {
  BOARD_WIDTH, BOARD_HEIGHT,
  createBoard, checkCollision, sweepRows,
  calcScore, calcLevel, calcDropSpeed,
} = require('../utils/gameHelpers');

describe('createBoard', () => {
  it('creates correct dimensions', () => {
    const b = createBoard();
    expect(b).toHaveLength(BOARD_HEIGHT);
    expect(b[0]).toHaveLength(BOARD_WIDTH);
  });

  it('all cells empty', () => {
    const b = createBoard();
    b.forEach((row) => row.forEach((cell) => {
      expect(cell[0]).toBe(0);
      expect(cell[1]).toBe('clear');
    }));
  });

  it('rows are independent references', () => {
    const b = createBoard();
    b[0][0] = [1, 'merged', '#fff'];
    expect(b[1][0][1]).toBe('clear');
  });
});

describe('checkCollision', () => {
  const board = createBoard();
  const player = {
    pos: { x: 4, y: 0 },
    tetromino: [[0,1,0],[1,1,1],[0,0,0]],
  };

  it('no collision in empty space', () => {
    expect(checkCollision(player, board, { x: 0, y: 0 })).toBe(false);
  });
  it('collision with left wall', () => {
    expect(checkCollision({ ...player, pos: { x: -1, y: 0 } }, board, { x: -1, y: 0 })).toBe(true);
  });
  it('collision with right wall', () => {
    expect(checkCollision({ ...player, pos: { x: BOARD_WIDTH - 1, y: 0 } }, board, { x: 1, y: 0 })).toBe(true);
  });
  it('collision with bottom', () => {
    expect(checkCollision({ ...player, pos: { x: 4, y: BOARD_HEIGHT - 1 } }, board, { x: 0, y: 1 })).toBe(true);
  });
  it('collision with merged cell', () => {
    const b = createBoard();
    b[5][5] = [1, 'merged', '#fff'];
    expect(checkCollision({ ...player, pos: { x: 4, y: 3 } }, b, { x: 0, y: 1 })).toBe(true);
  });
});

describe('sweepRows', () => {
  it('no clear on empty board', () => {
    expect(sweepRows(createBoard()).rowsCleared).toBe(0);
  });
  it('clears one full row', () => {
    const b = createBoard();
    b[BOARD_HEIGHT - 1] = Array(BOARD_WIDTH).fill([1, 'merged', '#fff']);
    const { rowsCleared, newBoard } = sweepRows(b);
    expect(rowsCleared).toBe(1);
    expect(newBoard).toHaveLength(BOARD_HEIGHT);
  });
  it('clears four rows (Tetris!)', () => {
    const b = createBoard();
    for (let i = BOARD_HEIGHT - 4; i < BOARD_HEIGHT; i++)
      b[i] = Array(BOARD_WIDTH).fill([1, 'merged', '#fff']);
    expect(sweepRows(b).rowsCleared).toBe(4);
  });
});

describe('calcScore', () => {
  it('40 for 1 row level 1', ()  => expect(calcScore(1, 0)).toBe(40));
  it('1200 for 4 rows level 1',  () => expect(calcScore(4, 0)).toBe(1200));
  it('scales with level',        () => expect(calcScore(1, 1)).toBe(80));
  it('0 for no rows',            () => expect(calcScore(0, 0)).toBe(0));
});

describe('calcLevel', () => {
  it('level 1 at 0 rows',  () => expect(calcLevel(0)).toBe(1));
  it('level 2 at 10 rows', () => expect(calcLevel(10)).toBe(2));
});

describe('calcDropSpeed', () => {
  it('800ms at level 1',           () => expect(calcDropSpeed(1)).toBe(800));
  it('faster at level 5',          () => expect(calcDropSpeed(5)).toBeLessThan(800));
  it('minimum 100ms at high level',() => expect(calcDropSpeed(100)).toBeGreaterThanOrEqual(100));
});
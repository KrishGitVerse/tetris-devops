// import React, { memo } from 'react';

// const Cell = ({ type, color }) => {
//   const filled = type !== 'clear' && type !== undefined && color !== null;

//   return (
//     <div style={{
//       width: '24px',
//       height: '24px',
//       boxSizing: 'border-box',
//       background: filled
//         ? `rgba(${color}, 0.85)`
//         : 'rgba(0, 0, 0, 0.3)',
//       border: filled
//         ? `3px solid`
//         : '1px solid rgba(255,255,255,0.04)',
//       borderColor: filled
//         ? `rgba(${color},1) rgba(${color},0.3) rgba(${color},0.3) rgba(${color},1)`
//         : undefined,
//       boxShadow: filled
//         ? `0 0 6px rgba(${color},0.5), inset 0 0 6px rgba(255,255,255,0.15)`
//         : 'none',
//       borderRadius: filled ? '2px' : '0',
//     }} />
//   );
// };

// export default memo(Cell);
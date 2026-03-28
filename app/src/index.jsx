// // // import React from 'react';
// // // import ReactDOM from 'react-dom/client';
// // // import App from './App';

// // // // Global styles
// // // const style = document.createElement('style');
// // // style.textContent = `
// // //   * {
// // //     margin: 0;
// // //     padding: 0;
// // //     box-sizing: border-box;
// // //   }
// // //   body {
// // //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
// // //     background: #0a0a1a;
// // //     color: #ffffff;
// // //     overflow: hidden;
// // //   }
// // // `;
// // // document.head.appendChild(style);

// // // const root = ReactDOM.createRoot(document.getElementById('root'));
// // // root.render(
// // //   <React.StrictMode>
// // //     <App />
// // //   </React.StrictMode>
// // // );

// // const React = require('react');
// // const { createRoot } = require('react-dom/client');
// // const App = require('./App');

// // const style = document.createElement('style');
// // style.textContent = `
// //   * { margin: 0; padding: 0; box-sizing: border-box; }
// //   body {
// //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
// //     background: #0a0a1a;
// //     color: #ffffff;
// //     overflow: hidden;
// //   }
// // `;
// // document.head.appendChild(style);

// // const root = createRoot(document.getElementById('root'));
// // root.render(
// //   React.createElement(React.StrictMode, null,
// //     React.createElement(App, null)
// //   )
// // );

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';

// const style = document.createElement('style');
// style.textContent = `
//   * { margin: 0; padding: 0; box-sizing: border-box; }
//   body {
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//     background: #0a0a1a;
//     color: #fff;
//     overflow: hidden;
//   }
// `;
// document.head.appendChild(style);

// const root = createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const style = document.createElement('style');
style.textContent = `
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#0a0a1a; color:#fff; overflow:hidden;
         font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
  *:focus { outline: none; }
`;
document.head.appendChild(style);

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
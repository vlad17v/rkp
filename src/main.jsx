import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';


const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background-color: #F4A261;
  }
  #root {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
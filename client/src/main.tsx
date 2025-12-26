import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client'; // 使用 createRoot

const root = ReactDOM.createRoot(document.getElementById('app')!); // 获取根 DOM 节点
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

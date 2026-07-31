import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './store';

console.log(store.getState().locale.dir);
console.log(store.getState().locale.lang);
document.documentElement.dir = store.getState().locale.dir;
document.documentElement.lang = store.getState().locale.lang;
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

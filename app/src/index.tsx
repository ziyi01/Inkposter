import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './global.css';
import { UserModel } from './userModel';
import { initSockets } from './components/socket-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const model = new UserModel();
initSockets(model);

root.render(
  <React.StrictMode>
    <App model={model} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

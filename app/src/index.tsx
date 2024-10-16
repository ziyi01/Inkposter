import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './global.css';
import { UserModel } from './userModel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const model = new UserModel();

root.render(

    <App model={model} />

);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Routes } from './Router.js'
import { ContextProvider } from './context/context.jsx'


ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Routes/>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


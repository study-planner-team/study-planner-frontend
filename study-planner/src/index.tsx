import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // I commented out the strict mode because it caused the components to mount twice and call the backend API twice, causing problems and errors
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);


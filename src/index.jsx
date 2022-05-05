import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import App from './App';

render(
  <React.StrictMode>
    <Router>
      <UserProvider>
    <App />
    </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

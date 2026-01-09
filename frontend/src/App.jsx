import React from 'react';
import Dashboard from './pages/Dashboard';
import './App.css';

/**
 * Main App component.
 * Ensures the default export is present to resolve the Vite SyntaxError.
 */
const App = () => {
  return (
    <div className="app-container">
      <Dashboard />
    </div>
  );
};

export default App;
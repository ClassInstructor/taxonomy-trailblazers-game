import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18+
import App from './App'; // Import your App component

// Get the root DOM element where your React app will be mounted
const rootElement = document.getElementById('root');

// Create a root and render your App component
// This is the standard way to render React 18+ applications
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

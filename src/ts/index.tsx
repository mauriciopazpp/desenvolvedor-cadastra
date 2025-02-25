import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const serverUrl = "http://localhost:5000";

function main() {
  console.log(serverUrl);
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

document.addEventListener("DOMContentLoaded", main);
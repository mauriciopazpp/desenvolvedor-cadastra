import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Mockup from './pages/Mockup/Mockup';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mockup" element={<Mockup />} />
    </Routes>
  );
};

export default App;

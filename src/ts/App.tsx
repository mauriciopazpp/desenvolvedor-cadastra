import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Mockup from './pages/Mockup/Mockup';
import Category from './pages/Category/Category';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mockup" element={<Mockup />} />
      <Route path="/category" element={<Category />} />
    </Routes>
  );
};

export default App;

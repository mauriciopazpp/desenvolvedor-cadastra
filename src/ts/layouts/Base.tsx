import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BaseProps {
  children: React.ReactNode;
}

const Base: React.FC<BaseProps> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Base;
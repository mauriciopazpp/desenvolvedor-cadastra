import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home: React.FC = () => (
  <div>
    <Header />
    <h1>Home Page</h1>
    <p>
      <Link to="/mockup">Mockup page</Link>.
    </p>
    <Footer />
  </div>
);

export default Home;

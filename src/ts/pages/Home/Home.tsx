import React from 'react';
import { Link } from 'react-router-dom';
import Base from '../../layouts/Base';

const Home: React.FC = () => (
  <Base>
    <h2>Home Page</h2>
    <div className='grid'>
      <Link to="/mockup">Mockup page</Link>
      <Link to="/category">Product list page</Link>
    </div>
  </Base>
);

export default Home;

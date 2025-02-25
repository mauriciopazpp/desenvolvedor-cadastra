import React from 'react';
import { Link } from 'react-router-dom';
import Base from '../../layouts/Base';

const Home: React.FC = () => (
  <Base>
    <h1>Home Page</h1>
    <p>
      <Link to="/mockup">Mockup page</Link>.
    </p>
  </Base>
);

export default Home;

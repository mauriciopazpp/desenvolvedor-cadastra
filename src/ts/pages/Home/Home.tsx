import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div>
    <h1>Home Page</h1>
    <p>
      <Link to="/mockup">Mockup page</Link>.
    </p>
  </div>
);

export default Home;

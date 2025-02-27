import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="main-header">
      <div className="container">
        <Link to="/">
          <img src="img/cadastra.png" alt="Cadastra" width={165.82} />
        </Link>
      </div>
    </div>
  );
};

export default Header;

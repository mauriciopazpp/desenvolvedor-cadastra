import React, { useState } from 'react';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="main-header">
      <div className="container">
        <img src="img/cadastra.png" alt="Cadastra" width={165.82} />
      </div>
    </div>
  );
};

export default Header;

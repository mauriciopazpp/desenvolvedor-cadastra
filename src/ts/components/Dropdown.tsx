import React, { useState } from 'react';

interface DropdownProps { }

const Dropdown: React.FC<DropdownProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dropdown ${isOpen ? 'show' : ''}`}>
      <button
        className="dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Ordenar por
      </button>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="#">Mas recentes</a>
        <a className="dropdown-item" href="#">Menor preço</a>
        <a className="dropdown-item" href="#">Maior preço</a>
      </div>
    </div>
  );
};

export default Dropdown;
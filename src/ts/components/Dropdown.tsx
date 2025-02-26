import React, { useState } from 'react';

interface DropdownProps {
  handleSortChange: (sortType: string) => void;
  sortOrder: string;
}

const Dropdown: React.FC<DropdownProps> = ({ handleSortChange, sortOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (sortType: string) => {
    handleSortChange(sortType);
    setIsOpen(false);
  };

  const getSelectedOptionLabel = () => {
    switch (sortOrder) {
      case 'recent':
        return 'Mas recentes';
      case 'lowPrice':
        return 'Menor preço';
      case 'highPrice':
        return 'Maior preço';
      default:
        return 'Ordenar por';
    }
  };

  return (
    <div className={`dropdown ${isOpen ? 'show' : ''}`}>
      <button
        className="dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getSelectedOptionLabel()}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a className="dropdown-item" href="javascript:void(0)" onClick={() => handleSort('recent')}>Mas recentes</a>
          <a className="dropdown-item" href="javascript:void(0)" onClick={() => handleSort('lowPrice')}>Menor preço</a>
          <a className="dropdown-item" href="javascript:void(0)" onClick={() => handleSort('highPrice')}>Maior preço</a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
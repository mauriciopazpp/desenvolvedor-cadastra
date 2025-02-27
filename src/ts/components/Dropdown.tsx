import React, { useState } from 'react';

interface DropdownProps {
  onSortChange: (sortType: string) => void;
  sortOrder: string;
}

const Dropdown: React.FC<DropdownProps> = ({ onSortChange, sortOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (sortType: string) => {
    onSortChange(sortType);
    setIsOpen(false);
  };

  const getSelectedOptionLabel = () => {
    switch (sortOrder) {
      case 'recent':
        return 'Mais recentes';
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
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {getSelectedOptionLabel()}
      </button>
      {isOpen && (
        <div className="dropdown-menu" role="menu">
          <button
            className="dropdown-item"
            type="button"
            onClick={() => handleSort('recent')}
            role="menuitem"
          >
            Mais recentes
          </button>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => handleSort('lowPrice')}
            role="menuitem"
          >
            Menor preço
          </button>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => handleSort('highPrice')}
            role="menuitem"
          >
            Maior preço
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

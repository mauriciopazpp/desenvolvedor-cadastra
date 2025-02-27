import React from 'react';
import Button from '../../../components/Button';

interface FilterButtonsProps {
  onFilterClick: () => void;
  onOrderClick: () => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterClick, onOrderClick }) => {
  return (
    <div className="sidebar-mobile-filter flex">
      <Button label="Filtrar" onClick={onFilterClick} variant="terciary" />
      <Button label="Ordenar" onClick={onOrderClick} variant="terciary" />
    </div>
  );
};

export default FilterButtons;

import { forwardRef, useState } from 'react';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Accordion from '../../../components/Accordion';

interface SidebarProps {
  uniqueColors: string[];
  sizes: string[];
  selectedColors: string[];
  selectedSizes: string[];
  selectedPriceRanges: string[];
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onPriceRangeChange: (range: string) => void;
  onApplyFilters: () => void;
  onCleanFilters: () => void;
  onClose: () => void;
  isMobile: boolean;
}

const SidebarFilter = forwardRef<HTMLDivElement, SidebarProps>(({
  uniqueColors,
  sizes,
  selectedColors,
  selectedSizes,
  selectedPriceRanges,
  onColorChange,
  onSizeChange,
  onPriceRangeChange,
  onApplyFilters,
  onCleanFilters,
  onClose,
  isMobile,
}, ref) => {
  const [showAll, setShowAll] = useState(false);
  const [openFilters, setOpenFilters] = useState<{ [key: string]: boolean }>({});

  const handleFilterToggle = (filter: string, isOpen: boolean) => {
    setOpenFilters((prev) => ({ ...prev, [filter]: isOpen }));
  };

  const isAnyFilterOpen = Object.values(openFilters).some(Boolean);
  const visibleColors = showAll ? uniqueColors : uniqueColors.slice(0, 5);

  return (
    <div className='sidebar closed' ref={ref}>
      <div className="filter-box">
        <h2 className='filter-title'>FILTRAR</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <h6 className='heading-filter'></h6>

      <Accordion title="CORES" onToggle={(isOpen) => handleFilterToggle('colors', isOpen)}>
        <div className="checkboxes">
          {visibleColors.map((color, index) => (
            <Checkbox
              key={index}
              id={`checkbox-${index}`}
              label={color}
              checked={selectedColors.includes(color)}
              onChange={() => onColorChange(color)}
            />
          ))}
          {!showAll && uniqueColors.length > 5 && (
            <button onClick={() => setShowAll(true)} className="link">
              Ver todas as cores
            </button>
          )}
        </div>
      </Accordion>

      <Accordion title="TAMANHOS" onToggle={(isOpen) => handleFilterToggle('sizes', isOpen)}>
        <div className="flex sizes-filter">
          {sizes.map((size, index) => (
            <Button
              key={index}
              label={size}
              onClick={() => onSizeChange(size)}
              variant="terciary"
              extraClasses={`btn-no-border square ${selectedSizes.includes(size) ? 'active' : ''}`}
            />
          ))}
        </div>
      </Accordion>

      <Accordion title="FAIXA DE PREÇO" onToggle={(isOpen) => handleFilterToggle('price', isOpen)}>
        <Checkbox
          id="price-0-50"
          label="0 a 50"
          checked={selectedPriceRanges.includes('0-50')}
          onChange={() => onPriceRangeChange('0-50')}
        />
        <Checkbox
          id="price-51-150"
          label="51 a 150"
          checked={selectedPriceRanges.includes('51-150')}
          onChange={() => onPriceRangeChange('51-150')}
        />
        <Checkbox
          id="price-151-300"
          label="151 a 300"
          checked={selectedPriceRanges.includes('151-300')}
          onChange={() => onPriceRangeChange('151-300')}
        />
        <Checkbox
          id="price-301-500"
          label="301 a 500"
          checked={selectedPriceRanges.includes('301-500')}
          onChange={() => onPriceRangeChange('301-500')}
        />
        <Checkbox
          id="price-above-500"
          label="Acima de 500"
          checked={selectedPriceRanges.includes('above-500')}
          onChange={() => onPriceRangeChange('above-500')}
        />
      </Accordion>

      {isMobile && isAnyFilterOpen && (
        <div className="btn-group">
          <Button label="APLICAR" onClick={onApplyFilters} variant="secondary" extraClasses='btn-no-border' />
          <Button label="LIMPAR" onClick={onCleanFilters} variant="terciary" />
        </div>
      )}
    </div>
  );
});

export default SidebarFilter;

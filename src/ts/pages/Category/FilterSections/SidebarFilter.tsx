import { forwardRef } from 'react';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Accordion from '../../../components/Accordion';

interface SidebarProps {
  uniqueColors: string[];
  sizes: string[];
  tempSelectedColors: string[];
  tempSelectedSizes: string[];
  tempSelectedPriceRanges: string[];
  handleColorChange: (color: string) => void;
  handleSizeFilter: (size: string) => void;
  handlePriceRangeChange: (range: string) => void;
  handleApplyFilters: () => void;
  handleCleanFilters: () => void;
  isMobile: boolean;
}

const SidebarFilter = forwardRef<HTMLDivElement, SidebarProps>(({
  uniqueColors,
  sizes,
  tempSelectedColors,
  tempSelectedSizes,
  tempSelectedPriceRanges,
  handleColorChange,
  handleSizeFilter,
  handlePriceRangeChange,
  handleApplyFilters,
  handleCleanFilters,
  isMobile,
}, ref) => {
  return (
    <div className='sidebar closed' ref={ref}>
      <div className="filter-box">
        <h2 className='filter-title'>FILTRAR</h2>
        <button className="close-btn" onClick={handleCleanFilters}>×</button>
      </div>
      <h6 className='heading-filter'></h6>
      <Accordion title="CORES">
        <div className="checkboxes">
          {uniqueColors.map((color, index) => (
            <Checkbox
              key={index}
              id={`checkbox-${index}`}
              label={color}
              checked={tempSelectedColors.includes(color)}
              onChange={() => handleColorChange(color)}
            />
          ))}
        </div>
      </Accordion>
      <Accordion title="TAMANHOS">
        <div className="flex sizes-filter">
          {sizes.map((size, index) => (
            <Button
              key={index}
              label={size}
              onClick={() => handleSizeFilter(size)}
              variant="terciary"
              extraClasses={`btn-no-border square ${tempSelectedSizes.includes(size) ? 'active' : ''}`}
            />
          ))}
        </div>
      </Accordion>
      <Accordion title="FAIXA DE PREÇO">
        <Checkbox
          id="price-0-50"
          label="0 a 50"
          checked={tempSelectedPriceRanges.includes('0-50')}
          onChange={() => handlePriceRangeChange('0-50')}
        />
        <Checkbox
          id="price-51-150"
          label="51 a 150"
          checked={tempSelectedPriceRanges.includes('51-150')}
          onChange={() => handlePriceRangeChange('51-150')}
        />
        <Checkbox
          id="price-151-300"
          label="151 a 300"
          checked={tempSelectedPriceRanges.includes('151-300')}
          onChange={() => handlePriceRangeChange('151-300')}
        />
        <Checkbox
          id="price-301-500"
          label="301 a 500"
          checked={tempSelectedPriceRanges.includes('301-500')}
          onChange={() => handlePriceRangeChange('301-500')}
        />
        <Checkbox
          id="price-above-500"
          label="Acima de 500"
          checked={tempSelectedPriceRanges.includes('above-500')}
          onChange={() => handlePriceRangeChange('above-500')}
        />
      </Accordion>
      {isMobile && (
        <div className="btn-group">
          <Button label="APLICAR" onClick={handleApplyFilters} variant="secondary" extraClasses='btn-no-border' />
          <Button label="LIMPAR" onClick={handleCleanFilters} variant="terciary" />
        </div>
      )}
    </div>
  );
});

export default SidebarFilter;

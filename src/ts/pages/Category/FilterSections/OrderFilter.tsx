import { forwardRef } from 'react';
import Dropdown from '../../../components/Dropdown';

interface OrderFilterProps {
  sortOrder: string;
  onSortChange: (order: string) => void;
  onClose: () => void;
}

const OrderFilter = forwardRef<HTMLDivElement, OrderFilterProps>(({
  onSortChange,
  sortOrder,
  onClose
}, ref) => {
  return (
    <div className="order">
      <Dropdown
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
      <div className='orderbar closed' ref={ref}>
        <div className="filter-box">
          <h2 className='filter-title'>ORDENAR</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="order-menu">
          <button
            className="order-item"
            onClick={() => onSortChange('recent')}
          >
            Mais recentes
          </button>
          <button
            className="order-item"
            onClick={() => onSortChange('lowPrice')}
          >
            Menor preço
          </button>
          <button
            className="order-item"
            onClick={() => onSortChange('highPrice')}
          >
            Maior preço
          </button>
        </div>
      </div>
    </div>
  );
});

export default OrderFilter;

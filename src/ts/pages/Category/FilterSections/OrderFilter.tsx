import { forwardRef } from 'react';
import Dropdown from '../../../components/Dropdown';

interface OrderFilterProps {
  handleSortChange: (order: string) => void;
  sortOrder: string;
  handleClose: () => void;
}

const OrderFilter = forwardRef<HTMLDivElement, OrderFilterProps>(({ handleSortChange, sortOrder, handleClose }, ref) => {
  return (
    <div className="order">
      <Dropdown handleSortChange={handleSortChange} sortOrder={sortOrder} />
      <div className='orderbar closed' ref={ref}>
        <div className="filter-box">
          <h2 className='filter-title'>ORDENAR</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        <div className="order-menu">
          <a className="order-item" href="javascript:void(0)" onClick={() => handleSortChange('recent')}>Mais recentes</a>
          <a className="order-item" href="javascript:void(0)" onClick={() => handleSortChange('lowPrice')}>Menor preço</a>
          <a className="order-item" href="javascript:void(0)" onClick={() => handleSortChange('highPrice')}>Maior preço</a>
        </div>
      </div>
    </div>
  );
});

export default OrderFilter;

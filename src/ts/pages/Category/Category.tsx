import React, { useRef, useEffect, useState } from 'react';
import Base from '../../layouts/Base';
import ProductCard from '../../components/ProductCard';
import OrderFilter from './FilterSections/OrderFilter';
import SidebarFilter from './FilterSections/SidebarFilter';
import FilterButtons from './FilterSections/FilterButtons';
import useProducts from './Product/useProducts';
import useFilters from './FilterSections/useFilters';
import useResponsive from './useResponsive';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const Category: React.FC = () => {
  const sidebarElement = useRef<HTMLDivElement>(null);
  const orderbarElement = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { loading, allProducts, page, handleLoadMore } = useProducts();
  const isMobile = useResponsive();

  const {
    filteredProducts,
    tempSelectedColors,
    tempSelectedSizes,
    tempSelectedPriceRanges,
    sortOrder,
    setSortOrder,
    applyFilters,
    handleColorChange,
    handleSizeFilter,
    handlePriceRangeChange,
    handleCleanFilters
  } = useFilters(allProducts, isMobile);

  const [uniqueColors, setUniqueColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  useEffect(() => {
    if (allProducts.length) {
      const colors = Array.from(new Set(allProducts.flatMap(product => product.color))).sort();
      const sizes = Array.from(new Set(allProducts.flatMap(product => product.size).flat())).sort();
      setUniqueColors(colors);
      setSizes(sizes);
    }
  }, [allProducts]);

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    const searchParams = new URLSearchParams(window.location.search);
    order ? searchParams.set('order', order) : searchParams.delete('order');
    navigate(`?${searchParams.toString()}`);
    handleCloseOrderbar();
  };

  const handleFilter = () => {
    sidebarElement.current?.classList.toggle('opened');
    sidebarElement.current?.classList.toggle('closed');
  };

  const handleOrderbarToggle = () => {
    orderbarElement.current?.classList.toggle('opened');
    orderbarElement.current?.classList.toggle('closed');
  };

  const handleCloseSidebar = () => {
    sidebarElement.current?.classList.remove('opened');
    sidebarElement.current?.classList.add('closed');
  };

  const handleCloseOrderbar = () => {
    orderbarElement.current?.classList.remove('opened');
    orderbarElement.current?.classList.add('closed');
  };

  const handleApplyMobileFilters = () => {
    applyFilters(tempSelectedColors, tempSelectedSizes, tempSelectedPriceRanges);
    handleCloseSidebar();
  };

  const handleCleanAllFilters = () => {
    handleCleanFilters();
    handleCloseSidebar();
  };

  const visibleProducts = filteredProducts.slice(0, page * 9);

  return (
    <Base>
      <div className="category-title-section">
        <h2 className='category-title'>Blusas</h2>
        <OrderFilter
          ref={orderbarElement}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onClose={handleCloseOrderbar}
        />
      </div>

      <div className="product-list-page">
        <FilterButtons
          onFilterClick={handleFilter}
          onOrderClick={handleOrderbarToggle}
        />

        <SidebarFilter
          ref={sidebarElement}
          uniqueColors={uniqueColors}
          sizes={sizes}
          selectedColors={tempSelectedColors}
          selectedSizes={tempSelectedSizes}
          selectedPriceRanges={tempSelectedPriceRanges}
          onColorChange={handleColorChange}
          onSizeChange={handleSizeFilter}
          onPriceRangeChange={handlePriceRangeChange}
          onApplyFilters={handleApplyMobileFilters}
          onCleanFilters={handleCleanAllFilters}
          onClose={handleCloseSidebar}
          isMobile={isMobile}
        />

        <div className="product-grid">
          <div className="product-list-page list-type-1">
            {loading ? (
              <div className="loading-indicator">Carregando...</div>
            ) : visibleProducts.length > 0 ? (
              visibleProducts.map((product, index) => (
                <ProductCard key={`product-${index}`} product={product} />
              ))
            ) : (
              <div className="empty-state">Nenhum produto encontrado.</div>
            )}
          </div>

          {visibleProducts.length < filteredProducts.length && (
            <div className="load-more">
              <Button
                label="Carregar mais"
                onClick={handleLoadMore}
                variant="secondary"
                aria-label="Carregar mais produtos"
              />
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Category;

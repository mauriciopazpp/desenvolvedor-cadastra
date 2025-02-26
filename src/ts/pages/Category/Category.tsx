import React, { useState, useRef, useEffect } from 'react';
import Base from '../../layouts/Base';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import Accordion from '../../components/Accordion';
import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import { RootState, AppDispatch } from '../../store/store';
import { Product } from '../../Product';
import { useNavigate, useLocation } from 'react-router-dom';

const Category: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [page, setPage] = useState(1);
  const [sizes, setSizes] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [tempSelectedColors, setTempSelectedColors] = useState<string[]>([]);
  const [tempSelectedSizes, setTempSelectedSizes] = useState<string[]>([]);
  const [tempSelectedPriceRanges, setTempSelectedPriceRanges] = useState<string[]>([]);

  const sidebarElement = useRef<HTMLDivElement>(null);
  const orderbarElement = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, allProducts } = useSelector((state: RootState) => state.products);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (allProducts.length) {
      const colors = Array.from(new Set(allProducts.flatMap(product => product.color))).sort();
      const sizes = Array.from(new Set(allProducts.flatMap(product => product.size).flat())).sort();
      setUniqueColors(colors);
      setSizes(sizes);
    }
  }, [allProducts]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const colorsFromURL = params.get('colors')?.split(',') || [];
    const sizesFromURL = params.get('sizes')?.split(',') || [];
    const priceRangesFromURL = params.get('price')?.split(',') || [];
    const orderFromURL = params.get('order') || '';

    if (allProducts.length) {
      let items = allProducts.filter(product => {
        const colorMatch = colorsFromURL.length === 0 || colorsFromURL.some(color => product.color.toLowerCase() === color.toLowerCase());
        const sizeMatch = sizesFromURL.length === 0 || sizesFromURL.some(size => product.size.some(productSize => String(productSize).toLowerCase() === String(size).toLowerCase()));
        let priceMatch = true;

        if (priceRangesFromURL.length > 0) {
          priceMatch = priceRangesFromURL.some(range => {
            const [minPrice, maxPrice] = range.split('-').map(Number);
            return product.price >= minPrice && (maxPrice ? product.price <= maxPrice : product.price > minPrice);
          });
        }

        return colorMatch && sizeMatch && priceMatch;
      });

      if (orderFromURL === 'recent') {
        items = items.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
      } else if (orderFromURL === 'lowPrice') {
        items = items.sort((a, b) => a.price - b.price);
      } else if (orderFromURL === 'highPrice') {
        items = items.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(items);
    }
  }, [location.search, allProducts]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleColorChange = (color: string) => {
    const newColors = tempSelectedColors.includes(color)
      ? tempSelectedColors.filter(c => c !== color)
      : [...tempSelectedColors, color];
    setTempSelectedColors(newColors);

    if (!isMobile) {
      applyFilters(newColors, tempSelectedSizes, tempSelectedPriceRanges);
    }
  };

  const handleSizeFilter = (size: string) => {
    const newSizes = tempSelectedSizes.includes(size)
      ? tempSelectedSizes.filter(s => s !== size)
      : [...tempSelectedSizes, size];
    setTempSelectedSizes(newSizes);

    if (!isMobile) {
      applyFilters(tempSelectedColors, newSizes, tempSelectedPriceRanges);
    }
  };

  const handlePriceRangeChange = (range: string) => {
    const newPriceRanges = tempSelectedPriceRanges.includes(range)
      ? tempSelectedPriceRanges.filter(r => r !== range)
      : [...tempSelectedPriceRanges, range];
    setTempSelectedPriceRanges(newPriceRanges);

    if (!isMobile) {
      applyFilters(tempSelectedColors, tempSelectedSizes, newPriceRanges);
    }
  };

  const applyFilters = (colors: string[], sizes: string[], priceRanges: string[]) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (colors.length > 0) {
      searchParams.set('colors', colors.join(','));
    } else {
      searchParams.delete('colors');
    }

    if (sizes.length > 0) {
      searchParams.set('sizes', sizes.join(','));
    } else {
      searchParams.delete('sizes');
    }

    if (priceRanges.length > 0) {
      searchParams.set('price', priceRanges.join(','));
    } else {
      searchParams.delete('price');
    }

    navigate(`?${searchParams.toString()}`);
  };

  const handleApplyFilters = () => {
    applyFilters(tempSelectedColors, tempSelectedSizes, tempSelectedPriceRanges);
    handleClose();
  };

  const handleCleanFilters = () => {
    setSortOrder('');
    navigate('');
    handleClose();
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    dispatch(fetchProducts(page + 1));
  };

  const handleFilter = () => {
    if (sidebarElement.current) {
      sidebarElement.current.classList.toggle('opened');
      sidebarElement.current.classList.toggle('closed');
    }
  };

  const handleClose = () => {
    if (sidebarElement.current) {
      sidebarElement.current.classList.remove('opened');
      sidebarElement.current.classList.add('closed');
    }
    if (orderbarElement.current) {
      orderbarElement.current.classList.remove('opened');
      orderbarElement.current.classList.add('closed');
    }
  };

  const handleOrderbarClose = () => {
    if (orderbarElement.current) {
      orderbarElement.current.classList.remove('closed');
      orderbarElement.current.classList.add('opened');
    }
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    const searchParams = new URLSearchParams(window.location.search);
    if (order) {
      searchParams.set('order', order);
    } else {
      searchParams.delete('order');
    }
    navigate(`?${searchParams.toString()}`);
    handleClose();
  };

  const visibleProducts = filteredProducts.slice(0, page * 9);

  return (
    <Base>
      <div className="category-title-section">
        <h2 className='category-title'>Blusas</h2>
        <div className="order">
          <Dropdown handleSortChange={handleSortChange} sortOrder={sortOrder} />
          <div className='orderbar closed' ref={orderbarElement}>
            <div className="filter-box">
              <h2 className='filter-title'>ORDENAR</h2>
              <button className="close-btn" onClick={handleClose}>×</button>
            </div>
            <div className="order-menu">
              <a className="order-item" href="javascript:void(0)" onClick={() => handleSortChange('recent')}>Mas recentes</a>
              <a className="order-item" href="javascript:void(0)" onClick={() => handleSortChange('lowPrice')}>Menor preço</a>
              <a className="order-item" href="javascript:void(0)" onClick={() => handleSortChange('highPrice')}>Maior preço</a>
            </div>
          </div>
        </div>
      </div>
      <div className="product-list-page">
        <div className="sidebar-mobile-filter flex">
          <Button label="Filtrar" onClick={handleFilter} variant="terciary" />
          <Button label="Ordenar" onClick={handleOrderbarClose} variant="terciary" />
        </div>
        <div className='sidebar closed' ref={sidebarElement}>
          <div className="filter-box">
            <h2 className='filter-title'>FILTRAR</h2>
            <button className="close-btn" onClick={handleClose}>×</button>
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
        <div className="product-grid">
          <div className="product-list-page list-type-1">
            {loading ? 'loading...' :
              (visibleProducts.length > 0
                ? visibleProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
                : 'Nenhum produto encontrado.')
            }
          </div>
          <div className="load-more">
            {visibleProducts.length < filteredProducts.length && (
              <Button label="Carregar mais" onClick={handleLoadMore} variant="secondary" />
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Category;

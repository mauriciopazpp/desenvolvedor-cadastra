import React, { useState, useRef, useEffect } from 'react';
import Base from '../../layouts/Base';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import { RootState, AppDispatch } from '../../store/store';
import { Product } from '../../Product';
import { useNavigate, useLocation } from 'react-router-dom';
import OrderFilter from './FilterSections/OrderFilter';
import SidebarFilter from './FilterSections/SidebarFilter';

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
    setTempSelectedColors([]);
    setTempSelectedSizes([]);
    setTempSelectedPriceRanges([]);
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

  const handleOrderbarClose = () => {
    if (orderbarElement.current) {
      orderbarElement.current.classList.toggle('opened');
      orderbarElement.current.classList.toggle('closed');
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
        <OrderFilter
          handleSortChange={handleSortChange}
          sortOrder={sortOrder}
          handleClose={handleClose}
          ref={orderbarElement}
        />
      </div>
      <div className="product-list-page">
        <div className="sidebar-mobile-filter flex">
          <Button label="Filtrar" onClick={handleFilter} variant="terciary" />
          <Button label="Ordenar" onClick={handleOrderbarClose} variant="terciary" />
        </div>
        <SidebarFilter
          uniqueColors={uniqueColors}
          sizes={sizes}
          tempSelectedColors={tempSelectedColors}
          tempSelectedSizes={tempSelectedSizes}
          tempSelectedPriceRanges={tempSelectedPriceRanges}
          handleColorChange={handleColorChange}
          handleSizeFilter={handleSizeFilter}
          handlePriceRangeChange={handlePriceRangeChange}
          handleApplyFilters={handleApplyFilters}
          handleCleanFilters={handleCleanFilters}
          isMobile={isMobile}
          ref={sidebarElement}
        />
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
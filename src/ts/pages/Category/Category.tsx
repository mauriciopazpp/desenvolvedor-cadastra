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
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');

  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const sidebarElement = useRef<HTMLDivElement>(null);
  const orderbarElement = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error, totalCount, allProducts } = useSelector((state: RootState) => state.products);

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

    setSelectedColors(colorsFromURL);
    setSelectedSizes(sizesFromURL);
    setSelectedPriceRanges(priceRangesFromURL);

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
        console.log(items)
      } else if (orderFromURL === 'highPrice') {
        items = items.sort((a, b) => b.price - a.price);
      }


      setFilteredProducts(items);
    }
  }, [location.search, allProducts]);

  const handleColorChange = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);

    const searchParams = new URLSearchParams(window.location.search);
    if (newColors.length > 0) {
      searchParams.set('colors', newColors.join(','));
    } else {
      searchParams.delete('colors');
    }
    navigate(`?${searchParams.toString()}`);
  };

  const handleSizeFilter = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);

    const searchParams = new URLSearchParams(window.location.search);
    if (newSizes.length > 0) {
      searchParams.set('sizes', newSizes.join(','));
    } else {
      searchParams.delete('sizes');
    }
    navigate(`?${searchParams.toString()}`);
  };

  const handlePriceRangeChange = (range: string) => {
    const newPriceRanges = selectedPriceRanges.includes(range)
      ? selectedPriceRanges.filter(r => r !== range)
      : [...selectedPriceRanges, range];
    setSelectedPriceRanges(newPriceRanges);

    const searchParams = new URLSearchParams(window.location.search);
    if (newPriceRanges.length > 0) {
      searchParams.set('price', newPriceRanges.join(','));
    } else {
      searchParams.delete('price');
    }
    navigate(`?${searchParams.toString()}`);
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
  };

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
              <a className="order-item" href="#">Mas recentes</a>
              <a className="order-item" href="#">Menor preço</a>
              <a className="order-item" href="#">Maior preço</a>
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
                  checked={selectedColors.includes(color)}
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
                  extraClasses={`btn-no-border square ${selectedSizes.includes(size) ? 'active' : ''}`}
                />
              ))}
            </div>
          </Accordion>
          <Accordion title="FAIXA DE PREÇO">
            <Checkbox
              id="price-0-50"
              label="0 a 50"
              checked={selectedPriceRanges.includes('0-50')}
              onChange={() => handlePriceRangeChange('0-50')}
            />
            <Checkbox
              id="price-51-150"
              label="51 a 150"
              checked={selectedPriceRanges.includes('51-150')}
              onChange={() => handlePriceRangeChange('51-150')}
            />
            <Checkbox
              id="price-151-300"
              label="151 a 300"
              checked={selectedPriceRanges.includes('151-300')}
              onChange={() => handlePriceRangeChange('151-300')}
            />
            <Checkbox
              id="price-301-500"
              label="301 a 500"
              checked={selectedPriceRanges.includes('301-500')}
              onChange={() => handlePriceRangeChange('301-500')}
            />
            <Checkbox
              id="price-above-500"
              label="Acima de 500"
              checked={selectedPriceRanges.includes('above-500')}
              onChange={() => handlePriceRangeChange('above-500')}
            />
          </Accordion>
        </div>
        <div className="product-grid">
          <div className="product-list-page list-type-1">
            {loading ? 'loading...' :
              (filteredProducts.length > 0
                ? filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
                : 'Nenhum produto encontrado.')
            }
          </div>
          <div className="load-more">
            {filteredProducts.length < totalCount && (
              <Button label="Carregar mais" onClick={handleLoadMore} variant="secondary" />
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Category;

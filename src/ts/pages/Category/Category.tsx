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
  const [isBrancoChecked, setIsBrancoChecked] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);

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

    setSelectedColors(colorsFromURL);
    setSelectedSizes(sizesFromURL);

    if (allProducts.length) {
      const items = allProducts.filter(product => {
        const colorMatch = colorsFromURL.length === 0 || colorsFromURL.some(color => product.color.toLowerCase() === color.toLowerCase());
        const sizeMatch = sizesFromURL.length === 0 || sizesFromURL.some(size => product.size.some(productSize => String(productSize).toLowerCase() === String(size).toLowerCase()));
        return colorMatch && sizeMatch;
      });
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

    if (newColors.length === 0 && selectedSizes.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      const items = allProducts.filter(product =>
        newColors.some(selectedColor => product.color.toLowerCase() === selectedColor.toLowerCase())
      );
      setFilteredProducts(items);
    }
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

    if (newSizes.length === 0 && selectedColors.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      const items = allProducts.filter(product =>
        newSizes.some(selectedSize =>
          product.size.some(productSize => String(productSize).toLowerCase() === String(selectedSize).toLowerCase())
        )
      );
      setFilteredProducts(items);
    }
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

  return (
    <Base>
      <div className="category-title-section">
        <h2 className='category-title'>Blusas</h2>
        <div className="order">
          <Dropdown />
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
              id="checkbox-3"
              label="de R$0 até R$50"
              checked={isBrancoChecked}
              onChange={setIsBrancoChecked}
            />
            <Checkbox
              id="checkbox-3"
              label="de R$0 até R$50"
              checked={isBrancoChecked}
              onChange={setIsBrancoChecked}
            />
            <Checkbox
              id="checkbox-3"
              label="de R$0 até R$50"
              checked={isBrancoChecked}
              onChange={setIsBrancoChecked}
            />
            <Checkbox
              id="checkbox-3"
              label="de R$0 até R$50"
              checked={isBrancoChecked}
              onChange={setIsBrancoChecked}
            />
            <Checkbox
              id="checkbox-3"
              label="de R$0 até R$50"
              checked={isBrancoChecked}
              onChange={setIsBrancoChecked}
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

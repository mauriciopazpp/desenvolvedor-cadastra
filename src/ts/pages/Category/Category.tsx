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

const Category: React.FC = () => {
  const [_, setIsAmareloChecked] = useState(false);
  const [isAzulChecked, setIsAzulChecked] = useState(false);
  const [isBrancoChecked, setIsBrancoChecked] = useState(false);
  const sidebarElement = useRef<HTMLDivElement>(null);
  const orderbarElement = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error, totalCount, allProducts } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (allProducts.length) {
      const colors = Array.from(new Set(allProducts.flatMap(product => product.color))).sort();
      setUniqueColors(colors);
    }
  }, [allProducts]);

  const handleColorChange = (color: string) => {
    setSelectedColors(prevColors =>
      prevColors.includes(color)
        ? prevColors.filter(c => c !== color)
        : [...prevColors, color]
    );
  };

  const handleSizeFilter = () => {
    console.log('Size filter.');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
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
  }

  const handleOrderbarClose = () => {
    if (orderbarElement.current) {
      orderbarElement.current.classList.remove('closed');
      orderbarElement.current.classList.add('opened');
    }
  }

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
              <Button label="P" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="M" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="G" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="GG" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="U" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="36" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="38" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="40" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="36" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
              <Button label="40" onClick={handleSizeFilter} variant="terciary" extraClasses="square" />
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
              products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            }
          </div>
          <div className="load-more">
            {products.length < totalCount && (
              <Button label="Carregar mais" onClick={handleLoadMore} variant="secondary" />
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Category;

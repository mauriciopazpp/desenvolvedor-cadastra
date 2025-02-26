import React, { useState, useRef } from 'react';
import Base from '../../layouts/Base';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import Accordion from '../../components/Accordion';
import Dropdown from '../../components/Dropdown';

const Category: React.FC = () => {
  const [_, setIsAmareloChecked] = useState(false);
  const [isAzulChecked, setIsAzulChecked] = useState(false);
  const [isBrancoChecked, setIsBrancoChecked] = useState(false);
  const sidebarElement = useRef<HTMLDivElement>(null);
  const orderbarElement = useRef<HTMLDivElement>(null);

  const handleSizeFilter = () => {
    console.log('Size filter.');
  };

  const handleLoadMore = () => {
    console.log('Load more...');
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
              <Checkbox
                id="checkbox-1"
                label="Amarelo"
                checked={true}
                onChange={setIsAmareloChecked}
              />
              <Checkbox
                id="checkbox-2"
                label="Azul"
                checked={isAzulChecked}
                onChange={setIsAzulChecked}
              />
              <Checkbox
                id="checkbox-3"
                label="Branco"
                checked={isBrancoChecked}
                onChange={setIsBrancoChecked}
              />
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
            <ProductCard name="Camisa Mescla" price="R$ 28,00" priceSplit='até 3x de R$ 9,33' />
            <ProductCard name="Camisa Mescla" price="R$ 28,00" priceSplit='até 3x de R$ 9,33' />
            <ProductCard name="Camisa Mescla" price="R$ 28,00" priceSplit='até 3x de R$ 9,33' />
            <ProductCard name="Camisa Mescla" price="R$ 28,00" priceSplit='até 3x de R$ 9,33' />
            <ProductCard name="Camisa Mescla" price="R$ 28,00" priceSplit='até 3x de R$ 9,33' />
          </div>
          <div className="load-more">
            <Button label="Carregar mais" onClick={handleLoadMore} variant="secondary" />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Category;

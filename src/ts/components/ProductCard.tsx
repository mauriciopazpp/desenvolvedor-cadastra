import React, { useState } from 'react';
import Button from './Button';

interface ProductCardProps {
  name: string;
  price: string;
  priceSplit: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, priceSplit }) => {
  const handleClick = () => {
    console.log('Comprar...');
  };

  return (
    <div className='product-card'>
      <img src="img/img_2.png" alt={name} />
      <div className="product-details">
        <h6 className='product-name'>{name}</h6>
        <div className='product-price'>{price}</div>
        <div className='product-price-split'>{priceSplit}</div>
      </div>
      <Button label="COMPRAR" onClick={handleClick} variant="primary" extraClasses='btn-width-100' />
    </div>
  )
};

export default ProductCard;

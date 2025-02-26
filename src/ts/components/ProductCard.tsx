import React from 'react';
import Button from './Button';
import { Product } from '../Product';

interface ProductCardProps {
  product: Product;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, price, parcelamento, image } = product;

  const handleClick = () => {
    console.log('Comprar...');
  };

  return (
    <div className='product-card'>
      <img src={image} alt={name} />
      <div className="product-details">
        <h6 className='product-name'>{name}</h6>
        <div className='product-price'>{formatCurrency(price)}</div>
        <div className='product-price-split'>
          até {parcelamento[0]}x de {formatCurrency(parcelamento[1])}
        </div>
      </div>
      <Button label="COMPRAR" onClick={handleClick} variant="primary" extraClasses='btn-width-100' />
    </div>
  );
};

export default ProductCard;

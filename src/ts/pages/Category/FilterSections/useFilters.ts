import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../Product/Product';

const useFilters = (allProducts: Product[], isMobile: boolean) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [tempSelectedColors, setTempSelectedColors] = useState<string[]>([]);
  const [tempSelectedSizes, setTempSelectedSizes] = useState<string[]>([]);
  const [tempSelectedPriceRanges, setTempSelectedPriceRanges] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const colorsFromURL = params.get('colors')?.split(',') || [];
    const sizesFromURL = params.get('sizes')?.split(',') || [];
    const priceRangesFromURL = params.get('price')?.split(',') || [];
    const orderFromURL = params.get('order') || '';

    if (allProducts.length) {
      let items = allProducts.filter(product => {
        const colorMatch = colorsFromURL.length === 0 ||
          colorsFromURL.some(color => product.color.toLowerCase() === color.toLowerCase());

        const sizeMatch = sizesFromURL.length === 0 ||
          sizesFromURL.some(size => product.size.some(productSize =>
            String(productSize).toLowerCase() === String(size).toLowerCase()));

        let priceMatch = true;
        if (priceRangesFromURL.length > 0) {
          priceMatch = priceRangesFromURL.some(range => {
            const [minPrice, maxPrice] = range.split('-').map(Number);
            return product.price >= minPrice &&
              (maxPrice ? product.price <= maxPrice : product.price > minPrice);
          });
        }

        return colorMatch && sizeMatch && priceMatch;
      });

      if (orderFromURL === 'recent') {
        items = items.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      } else if (orderFromURL === 'lowPrice') {
        items = items.sort((a, b) => a.price - b.price);
      } else if (orderFromURL === 'highPrice') {
        items = items.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(items);
    }
  }, [location.search, allProducts]);

  const applyFilters = useCallback((colors: string[], sizes: string[], priceRanges: string[]) => {
    const searchParams = new URLSearchParams(window.location.search);

    colors.length ? searchParams.set('colors', colors.join(',')) : searchParams.delete('colors');
    sizes.length ? searchParams.set('sizes', sizes.join(',')) : searchParams.delete('sizes');
    priceRanges.length ? searchParams.set('price', priceRanges.join(',')) : searchParams.delete('price');

    navigate(`?${searchParams.toString()}`);
  }, [navigate]);

  const handleColorChange = useCallback((color: string) => {
    setTempSelectedColors(prev => {
      const newColors = prev.includes(color) ?
        prev.filter(c => c !== color) :
        [...prev, color];

      if (!isMobile) applyFilters(newColors, tempSelectedSizes, tempSelectedPriceRanges);
      return newColors;
    });
  }, [isMobile, tempSelectedSizes, tempSelectedPriceRanges, applyFilters]);

  const handleSizeFilter = useCallback((size: string) => {
    setTempSelectedSizes(prev => {
      const newSizes = prev.includes(size) ?
        prev.filter(s => s !== size) :
        [...prev, size];

      if (!isMobile) applyFilters(tempSelectedColors, newSizes, tempSelectedPriceRanges);
      return newSizes;
    });
  }, [isMobile, tempSelectedColors, tempSelectedPriceRanges, applyFilters]);

  const handlePriceRangeChange = useCallback((range: string) => {
    setTempSelectedPriceRanges(prev => {
      const newRanges = prev.includes(range) ?
        prev.filter(r => r !== range) :
        [...prev, range];

      if (!isMobile) applyFilters(tempSelectedColors, tempSelectedSizes, newRanges);
      return newRanges;
    });
  }, [isMobile, tempSelectedColors, tempSelectedSizes, applyFilters]);

  const handleCleanFilters = useCallback(() => {
    setTempSelectedColors([]);
    setTempSelectedSizes([]);
    setTempSelectedPriceRanges([]);
    setSortOrder('');
    navigate('');
  }, [navigate]);

  return {
    filteredProducts,
    tempSelectedColors,
    tempSelectedSizes,
    tempSelectedPriceRanges,
    sortOrder,
    setTempSelectedColors,
    setTempSelectedSizes,
    setTempSelectedPriceRanges,
    setSortOrder,
    applyFilters,
    handleColorChange,
    handleSizeFilter,
    handlePriceRangeChange,
    handleCleanFilters
  };
};

export default useFilters;

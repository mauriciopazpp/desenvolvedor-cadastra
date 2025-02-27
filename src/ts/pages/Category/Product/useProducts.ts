import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../store/productsSlice';
import { RootState, AppDispatch } from '../../../store/store';

const useProducts = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, allProducts } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    dispatch(fetchProducts(page + 1));
  };

  return {
    loading,
    allProducts,
    page,
    handleLoadMore,
  };
};

export default useProducts;

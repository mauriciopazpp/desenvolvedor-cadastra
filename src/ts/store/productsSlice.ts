import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../Product';

const server = 'http://localhost:5000/products';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  totalCount: 0,
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (page: number) => {
    const limit = 9;
    const response = await fetch(server);
    const products = await response.json();
    const totalCount = products.length;
    const paginatedProducts = products.slice((page - 1) * limit, page * limit);

    return { paginatedProducts, totalCount };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { paginatedProducts, totalCount } = action.payload;
        state.totalCount = totalCount;
        if (state.items.length === 0 || action.meta.arg === 1) {
          state.items = paginatedProducts;
        } else {
          state.items = [...state.items, ...paginatedProducts];
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar produtos';
      });
  },
});

export default productsSlice.reducer;

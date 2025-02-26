import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../Product';

const server = 'http://localhost:5000/products';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await fetch(server);
  return (await response.json()) as Product[];
});

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
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar produtos';
      });
  },
});

export default productsSlice.reducer;

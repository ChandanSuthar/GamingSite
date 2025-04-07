import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [],
  favorites: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {
    category: '',
    tags: [],
    releaseYear: '',
    popularity: '',
  },
};

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.some(game => game.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(game => game.id !== action.payload);
    },
  },
});

export const {
  setGames,
  setLoading,
  setError,
  setCurrentPage,
  setTotalPages,
  setFilters,
  addToFavorites,
  removeFromFavorites,
} = gameSlice.actions;

export default gameSlice.reducer; 
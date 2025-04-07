import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    tags: [],
    releaseYear: '',
    ordering: '-rating',
  },
  searchQuery: '',
  currentPage: 1,
  hasMore: true,
  favorites: [],
};

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
    appendGames: (state, action) => {
      state.games = [...state.games, ...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset page when filters change
      state.games = []; // Clear existing games when filters change
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
      state.games = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      state.games = [];
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    toggleFavorite: (state, action) => {
      const gameId = action.payload;
      const index = state.favorites.indexOf(gameId);
      if (index === -1) {
        state.favorites.push(gameId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export const {
  setGames,
  appendGames,
  setLoading,
  setError,
  setFilters,
  resetFilters,
  setSearchQuery,
  setCurrentPage,
  setHasMore,
  toggleFavorite,
} = gameSlice.actions;

export default gameSlice.reducer; 
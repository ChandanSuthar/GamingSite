import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gameSlice';

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 
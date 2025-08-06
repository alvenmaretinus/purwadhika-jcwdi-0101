import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/reducers/counterReducer';

export const mainStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

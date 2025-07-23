import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/reducers/userReducer';

const defaultStore = configureStore({
  reducer: {
    user: userReducer
  }
});

export default defaultStore;

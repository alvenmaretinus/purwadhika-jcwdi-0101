import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem('userEmail') ?? '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem('userEmail', state.email);
    },
    logout: (state) => {
      state.email = '';
      localStorage.setItem('userEmail', '');
    },
  }
});

export const { updateEmail, logout } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.items = action.payload;
    },

    addToFavorites(state, action) {
      const exists = state.items.some(
        (movie) => movie.id === action.payload.id,
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromFavorites(state, action) {
      state.items = state.items.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { setFavorites, addToFavorites, removeFromFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

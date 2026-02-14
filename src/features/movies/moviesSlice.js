import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: [],
  airingNow: [],
  currentCategory: "popular",
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  selectedMovie: null,
  searchQuery: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.currentCategory = action.payload;
      state.page = 1;
    },

    setPage(state, action) {
      state.page = action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    fetchMoviesRequest(state, action) {
      const { page, category } = action.payload;

      state.loading = true;
      if (category) state.currentCategory = category;

      if (state.currentCategory === "popular") {
        state.popular = [];
      } else {
        state.airingNow = [];
      }

      state.error = null;
      state.page = page;
    },

    fetchMoviesSuccess(state, action) {
      state.loading = false;

      const { results, totalPages } = action.payload;

      if (state.currentCategory === "popular") {
        state.popular = results;
      } else {
        state.airingNow = results;
      }

      state.totalPages = totalPages;
    },

    fetchMoviesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchMovieRequest(state, action) {
      const { id } = action.payload;

      state.loading = true;
      state.error = null;
      state.selectedMovie = null;
    },

    fetchMovieSuccess(state, action) {
      state.loading = false;

      state.selectedMovie = action.payload.data;
    },

    fetchMovieFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCategory,
  setPage,
  setSearchQuery,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  fetchMovieRequest,
  fetchMovieSuccess,
  fetchMovieFailure,
} = moviesSlice.actions;

export default moviesSlice.reducer;

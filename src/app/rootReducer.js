import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
});

export default rootReducer;

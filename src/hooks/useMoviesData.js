import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchMoviesRequest,
  setCategory,
} from "../features/movies/moviesSlice";
import { CATEGORIES } from "../helpers/constants";

export const useMoviesData = () => {
  const dispatch = useDispatch();

  const {
    popular,
    airingNow,
    page,
    totalPages,
    currentCategory,
    loading,
    error,
  } = useSelector((state) => state.movies);

  const { items: favorites } = useSelector((state) => state.favorites);

  const moviesMap = {
    popular,
    airingNow,
    favorites,
  };

  const movies = moviesMap[currentCategory] ?? [];

  const changeCategory = (category) => {
    dispatch(setCategory(category));

    if (category !== CATEGORIES.FAVORITES) {
      dispatch(fetchMoviesRequest({ page: 1, category }));
    }
  };

  const changePage = (pageNumber) => {
    dispatch(fetchMoviesRequest({ page: pageNumber }));
  };

  useEffect(() => {
    if (!movies.length && currentCategory !== CATEGORIES.FAVORITES) {
      changeCategory(currentCategory);
    }
  }, []);

  return {
    movies,
    page,
    totalPages,
    currentCategory,
    loading,
    error,
    changeCategory,
    changePage,
  };
};

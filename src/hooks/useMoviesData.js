import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchMoviesRequest,
  setCategory,
} from "../features/movies/moviesSlice";

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

    if (category !== "favorites") {
      dispatch(fetchMoviesRequest({ page: 1, category }));
    }
  };

  const changePage = (pageNumber) => {
    dispatch(fetchMoviesRequest({ page: pageNumber }));
  };

  useEffect(() => {
    dispatch(fetchMoviesRequest({ page: 1 }));
  }, [dispatch]);

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

import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

export const fetchPopularMoviesApi = (page = 1, query = "") =>
  api.get("/movie/popular", {
    params: {
      api_key: API_KEY,
      page,
      query,
    },
  });

export const fetchAiringMoviesApi = (page = 1) =>
  api.get("/movie/now_playing", {
    params: {
      api_key: API_KEY,
      page,
    },
  });

export const fetchMovieApi = (id) =>
  api.get(`/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });

export const fetchSearchMoviesApi = (page = 1, query = "") =>
  api.get("/search/movie", {
    params: {
      api_key: API_KEY,
      page,
      query,
    },
  });

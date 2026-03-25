const runtimeConfig = window.__config || {};

export const config = {
  TMDB_API_KEY: runtimeConfig.TMDB_API_KEY || import.meta.env.VITE_TMDB_API_KEY,
};

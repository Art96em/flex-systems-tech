export const ZONES = {
  TABS: "tabs",
  SEARCH: "search",
  GRID: "grid",
  PAGINATION: "pagination",
};

export const CATEGORIES = {
  POPULAR: "popular",
  AIRING_NOW: "airingNow",
  FAVORITES: "favorites",
};

export const TABS = [
  { label: "Popular", value: CATEGORIES.POPULAR, order: 0 },
  { label: "Airing Now", value: CATEGORIES.AIRING_NOW, order: 1 },
  { label: "My Favorites", value: CATEGORIES.FAVORITES, order: 2 },
];

export const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export const CARD_PER_ROW = 4;
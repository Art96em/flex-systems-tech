import { takeEvery, select } from "redux-saga/effects";
import { addToFavorites, removeFromFavorites } from "./favoritesSlice";
import { CATEGORIES } from "../../helpers/constants";

function* saveFavoritesToStorage() {
  const favorites = yield select((state) => state.favorites.items);

  try {
    localStorage.setItem(CATEGORIES.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites", error);
  }
}

export function* favoritesSaga() {
  yield takeEvery(addToFavorites.type, saveFavoritesToStorage);
  yield takeEvery(removeFromFavorites.type, saveFavoritesToStorage);
}

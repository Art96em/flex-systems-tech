import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { setFavorites } from "../features/favorites/favoritesSlice";
import { CATEGORIES } from "../helpers/constants";

const loadFavoritesFromStorage = () => {
  try {
    const data = localStorage.getItem(CATEGORIES.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const logger = createLogger({
  collapsed: true,
  level: "info",
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([sagaMiddleware, logger]),
});

sagaMiddleware.run(rootSaga);

store.dispatch(setFavorites(loadFavoritesFromStorage()));

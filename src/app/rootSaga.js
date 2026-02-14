import { all, fork } from "redux-saga/effects";
import moviesSaga from "../features/movies/moviesSaga";
import { favoritesSaga } from "../features/favorites/favoritesSaga";

export default function* rootSaga() {
  yield all([fork(moviesSaga), fork(favoritesSaga)]);
}

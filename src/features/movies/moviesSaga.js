import {
  call,
  debounce,
  put,
  select,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import {
  fetchMovieFailure,
  fetchMovieRequest,
  fetchMoviesFailure,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMovieSuccess,
  setSearchQuery,
} from "./moviesSlice";
import {
  fetchMovieApi,
  fetchPopularMoviesApi,
  fetchAiringMoviesApi,
  fetchSeachMoviesApi,
} from "./moviesApi";

function* fetchPopularWorker(action) {
  try {
    const { page } = action.payload;

    const { currentCategory, searchQuery } = yield select(
      (state) => state.movies,
    );

    let response;

    if (searchQuery) {
      response = yield call(fetchSeachMoviesApi, page, searchQuery);
    } else if (currentCategory === "popular") {
      response = yield call(fetchPopularMoviesApi, page, searchQuery);
    } else if (currentCategory === "airingNow") {
      response = yield call(fetchAiringMoviesApi, page, searchQuery);
    }

    yield put(
      fetchMoviesSuccess({
        results: response.data.results,
        totalPages: response.data.total_pages,
      }),
    );
  } catch (error) {
    yield put(
      fetchMoviesFailure(
        error.response?.data?.status_message || "Something went wrong",
      ),
    );
  }
}

function* fetchMovieWorker(action) {
  try {
    const { id } = action.payload;

    const response = yield call(fetchMovieApi, id);

    yield put(
      fetchMovieSuccess({
        data: response.data, // TODO
      }),
    );
  } catch (error) {
    yield put(
      fetchMovieFailure(
        error.response?.data?.status_message || "Something went wrong",
      ),
    );
  }
}

function* fetchQueryWorker() {
  const { searchQuery } = yield select((state) => state.movies);

  if (!searchQuery || searchQuery.length < 2) return;

  yield put(fetchMoviesRequest({ page: 1 }));
}

export default function* moviesSaga() {
  yield takeLatest(fetchMovieRequest.type, fetchMovieWorker);
  yield throttle(2000, fetchMoviesRequest.type, fetchPopularWorker);
  yield debounce(500, setSearchQuery.type, fetchQueryWorker);
}

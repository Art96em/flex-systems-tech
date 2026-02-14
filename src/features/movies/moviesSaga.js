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

const REQUEST_LIMIT = 5;
const WINDOW_SIZE = 10000;

let requestTimestamps = [];

function* fetchPopularWorker(action) {
  const now = Date.now();

  requestTimestamps = requestTimestamps.filter(
    (timestamp) => now - timestamp < WINDOW_SIZE,
  );

  if (requestTimestamps.length >= REQUEST_LIMIT) {
    yield put(
      fetchMoviesFailure("Rate limit exceeded: max 5 requests per 10 seconds"),
    );
    return;
  }

  requestTimestamps.push(now);

  try {
    const { page } = action.payload;

    const { currentCategory, searchQuery } = yield select(
      (state) => state.movies,
    );

    let response;

    if (searchQuery) {
      response = yield call(fetchSeachMoviesApi, page, searchQuery);
    } else if (currentCategory === "popular") {
      response = yield call(fetchPopularMoviesApi, page);
    } else if (currentCategory === "airingNow") {
      response = yield call(fetchAiringMoviesApi, page);
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
        data: response.data,
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

  if (searchQuery && searchQuery.length < 2) return;

  yield put(fetchMoviesRequest({ page: 1 }));
}

export default function* moviesSaga() {
  yield takeLatest(fetchMovieRequest.type, fetchMovieWorker);
  yield takeLatest(fetchMoviesRequest.type, fetchPopularWorker);
  yield debounce(500, setSearchQuery.type, fetchQueryWorker);
}

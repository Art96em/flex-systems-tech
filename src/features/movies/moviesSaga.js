import { call, debounce, put, select, takeLatest } from "redux-saga/effects";

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
  fetchSearchMoviesApi,
} from "./moviesApi";
import { CATEGORIES } from "../../helpers/constants";

const REQUEST_LIMIT = 5;
const WINDOW_SIZE = 10000;

let requestTimestamps = [];

const apiMap = {
  [CATEGORIES.POPULAR]: fetchPopularMoviesApi,
  [CATEGORIES.AIRING_NOW]: fetchAiringMoviesApi,
};

function isRateLimited() {
  const now = Date.now();

  if (requestTimestamps.length >= REQUEST_LIMIT) {
    const oldestRequest = requestTimestamps[0];

    if (now - oldestRequest < WINDOW_SIZE) {
      return true;
    }

    requestTimestamps.shift();
  }

  requestTimestamps.push(now);
  return false;
}

function* callWithRateLimit(apiFn, ...args) {
  if (isRateLimited()) {
    throw new Error("Rate limit exceeded");
  }

  return yield call(apiFn, ...args);
}

function* fetchMoviesWorker(action) {
  try {
    const { page } = action.payload;
    const { currentCategory, searchQuery } = yield select(
      (state) => state.movies,
    );

    let response;

    if (searchQuery) {
      response = yield callWithRateLimit(
        fetchSearchMoviesApi,
        page,
        searchQuery,
      );
    } else {
      const api = apiMap[currentCategory];
      response = yield callWithRateLimit(api, page);
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
        error.message ||
          error.response?.data?.status_message ||
          "Something went wrong",
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
  yield takeLatest(fetchMoviesRequest.type, fetchMoviesWorker);
  yield debounce(500, setSearchQuery.type, fetchQueryWorker);
}

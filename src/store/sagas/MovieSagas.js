import { call, put } from 'redux-saga/effects';
import { movieService } from '../../services/MovieService';
import { setMovies, setPages, setMovie, setNewMovie, setQuery, setLiked, setGenre, addMovieError, setClosed, setComment, setWatchList, setToWatchList, unsetFromWatchList, setAsWatched } from '../actions/MovieActions';

export function* moviesGet({ payload }) {
  try {
    const { data } = yield call(movieService.getMovies, payload);
    yield put(setMovies(data.data));
    yield put(setPages(data.last_page));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieGet({ payload }) {
  try {
    const { data } = yield call(movieService.getMovie, payload);
    yield put(setMovie(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieAddNew({ payload }) {
  try{
    const { data } = yield call(movieService.addNewMovie, payload);
    yield put(setNewMovie(data));
    yield put(setClosed());
  } catch (error){
    yield put(addMovieError(error.response.data.errors));
  }
}

export function* movieSearch({ payload }) {
  try {
    const { data } = yield call(movieService.search, payload);
    yield put(setMovies(data.data));
    yield put(setPages(data.last_page));
    yield put(setQuery(payload.query));
    yield put(setGenre(payload.genre));
  } catch (error) {
    console.log(error);
  }
}

export function* movieLike({ payload }) {
  try {
    const { data } = yield call(movieService.like, payload);
    yield put(setLiked(data));
  } catch (error) {
    console.log(error);
  }
}

export function* movieDislike({ payload }) {
  try {
    const { data } = yield call(movieService.dislike, payload);
    yield put(setLiked(data));
  } catch (error) {
    console.log(error);
  }
}

export function* movieRemoveLike({ payload }) {
  try {
    const { data } = yield call(movieService.removeLike, payload);
    yield put(setLiked(data));
  } catch (error) {
    console.log(error);
  }
}

export function* movieRemoveDislike({ payload }) {
  try {
    const { data } = yield call(movieService.removeDislike, payload);
    yield put(setLiked(data));
  } catch (error) {
    console.log(error);
  }
}

export function* commentAdd({ payload }) {
  try {
    const { data } = yield call(movieService.addComment, payload);
    yield put(setComment(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchListGet() {
  try {
    const { data } = yield call(movieService.getWatchList);
    yield put(setWatchList(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchListAdd({ payload }){
  try {
    const { data } = yield call(movieService.addToWatchList, payload)
    yield put(setToWatchList(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchListRemove({ payload }) {
  try {
    const { data } = yield call(movieService.removeFromWatchList, payload);
    yield put(unsetFromWatchList(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchedAdd({ payload }) {
  try {
    const { data } = yield call(movieService.markAsWatched, payload);
    yield put(setAsWatched(data));
  } catch (error) {
    console.log(error);
  }
}
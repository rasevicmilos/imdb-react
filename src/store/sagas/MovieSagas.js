import { call, put } from 'redux-saga/effects';
import { movieService } from '../../services/MovieService';
import { setMovies, setPages, setMovie, setNewMovie, setQuery } from '../actions/MovieActions';

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
    console.log(data);
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieAddNew({ payload }) {
  try{
    const { data } = yield call(movieService.addNewMovie, payload);
    yield put(setNewMovie(data));
  } catch (error){
    console.log(error);
  }
}

export function* movieSearch({ payload }) {
  try {
    const { data } = yield call(movieService.search, payload);
    yield put(setMovies(data.data));
    yield put(setPages(data.last_page));
    yield put(setQuery(payload.query));
  } catch (error) {
    console.log(error);
  }
}
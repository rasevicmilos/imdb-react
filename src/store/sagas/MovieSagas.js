import { call, put } from 'redux-saga/effects';

import { movieService } from '../../services/MovieService';
import { setMovies, setPages } from '../actions/MovieActions';

export function* moviesGet({ payload }) {
  try {
    const { data } = yield call(movieService.getMovies, payload);

    yield put(setMovies(data.data));
    yield put(setPages(data.last_page));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

import { call, put } from 'redux-saga/effects';
import { omdbApiService } from '../../services/OMDBApiService';
import { setMovieNotFound, setActiveMovie, setOMDBConfirmOpen, setOMDBOpen } from '../actions/OMDBActions';
import { setNewMovie } from '../actions/MovieActions';


export function* movieFromApiGet({ payload }) {
  try {
    var data;
    if(payload.year) {
      data = yield call(omdbApiService.getMovieFromApiByYear, payload);
    } else {
      data = yield call(omdbApiService.getMovieFromApi, payload);
    }
    if(data.Response === "False") {
      yield put(setMovieNotFound(true));
    } else {
      yield put(setOMDBOpen(false));
      yield put(setActiveMovie({title: data.Title, description: data.Plot, image_url: data.Poster, genre: data.Genre}));
      yield put(setOMDBConfirmOpen(true));
    }
  } catch (error) {
    console.log(error); 
  }
}

export function* movieFromOMDBAdd({ payload }) {
  try {
    const { data } = yield call(omdbApiService.addNewMovie, payload);
    yield put(setNewMovie(data));
    yield put(setOMDBConfirmOpen(false));
  } catch (error) {
    console.log(error);
  }
}
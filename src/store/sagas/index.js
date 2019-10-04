import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_MOVIES, GET_MOVIE, LOGOUT, ADD_NEW_MOVIE, SEARCH_MOVIES } from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout } from './AuthSagas';
import { moviesGet, movieGet, movieAddNew, movieSearch } from './MovieSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_MOVIES, moviesGet),
    takeLatest(GET_MOVIE, movieGet),
    takeLatest(LOGOUT, userLogout),
    takeLatest(ADD_NEW_MOVIE, movieAddNew),
    takeLatest(SEARCH_MOVIES, movieSearch)
  ]);
}

import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_MOVIES, GET_MOVIE, LOGOUT, ADD_NEW_MOVIE, SEARCH_MOVIES, LIKE_MOVIE, DISLIKE_MOVIE, REMOVE_LIKE, REMOVE_DISLIKE } from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout } from './AuthSagas';
import { moviesGet, movieGet, movieAddNew, movieSearch, movieLike, movieDislike, movieRemoveLike, movieRemoveDislike } from './MovieSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_MOVIES, moviesGet),
    takeLatest(GET_MOVIE, movieGet),
    takeLatest(LOGOUT, userLogout),
    takeLatest(ADD_NEW_MOVIE, movieAddNew),
    takeLatest(SEARCH_MOVIES, movieSearch),
    takeLatest(LIKE_MOVIE, movieLike),
    takeLatest(DISLIKE_MOVIE, movieDislike),
    takeLatest(REMOVE_LIKE, movieRemoveLike),
    takeLatest(REMOVE_DISLIKE, movieRemoveDislike)
  ]);
}

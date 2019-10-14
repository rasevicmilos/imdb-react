import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_MOVIES, GET_MOVIE, LOGOUT, ADD_NEW_MOVIE, SEARCH_MOVIES, LIKE_MOVIE, DISLIKE_MOVIE, REMOVE_LIKE, REMOVE_DISLIKE, GET_GENRES, ADD_COMMENT, GET_WATCHLIST, ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, MARK_AS_WATCHED, GET_MOST_POPULAR, GET_COMMENTS, GET_RELATED, GET_MOVIE_FROM_API, ADD_MOVIE_FROM_OMDB } from '../actions/ActionTypes';
import { userLogin, userRegister, userLogout } from './AuthSagas';
import { moviesGet, movieGet, movieAddNew, movieSearch, movieLike, movieDislike, movieRemoveLike, movieRemoveDislike, commentAdd, watchListGet, watchListAdd, watchListRemove, watchedAdd, mostPopularGet, commentsGet, relatedGet } from './MovieSagas';
import { movieFromApiGet, movieFromOMDBAdd } from './OMDBSagas';
import { genresGet } from './GenreSagas';

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
    takeLatest(REMOVE_DISLIKE, movieRemoveDislike),
    takeLatest(GET_GENRES, genresGet),
    takeLatest(ADD_COMMENT, commentAdd),
    takeLatest(GET_WATCHLIST, watchListGet),
    takeLatest(ADD_TO_WATCHLIST, watchListAdd),
    takeLatest(REMOVE_FROM_WATCHLIST, watchListRemove),
    takeLatest(MARK_AS_WATCHED, watchedAdd),
    takeLatest(GET_MOST_POPULAR, mostPopularGet),
    takeLatest(GET_COMMENTS, commentsGet),
    takeLatest(GET_RELATED, relatedGet),
    takeLatest(GET_MOVIE_FROM_API, movieFromApiGet),
    takeLatest(ADD_MOVIE_FROM_OMDB, movieFromOMDBAdd)
  ]);
}

import { call, put } from 'redux-saga/effects';
import { push, go} from 'connected-react-router';
import { movieService } from '../../services/MovieService';
import { setMovies, setPages, setMovie, setNewMovie, setQuery, setLiked, setGenre, addMovieError, setClosed, setComment, setWatchList, setToWatchList, unsetFromWatchList, setAsWatched, setMostPopular, setComments, setCommentsActivePage, setCommentsFirstPageFetched, setMoreComments, setRelated, setLoading } from '../actions/MovieActions';

export function* moviesGet({ payload }) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(movieService.getMovies, payload);
    yield put(setMovies(data.data));
    yield put(setPages(data.last_page));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  } finally {
    yield put(setLoading(false));
  }
}

export function* movieGet({ payload }) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(movieService.getMovie, payload);
    const lastPage = yield call(movieService.getLastPage, payload);
    const comments = yield call(movieService.getComments, {movieId: payload, page: lastPage});
    yield put(setMovie(data));
    yield put(setComments(comments.data));
    yield put(setCommentsActivePage(lastPage));
    if (lastPage === 1) {
      yield put(setCommentsFirstPageFetched(true));
    } else {
      yield put(setCommentsFirstPageFetched(false));
    }
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/movie/1'));
      yield put(go());
    } 
  } finally {
    yield put(setLoading(false));
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
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* movieLike({ payload }) {
  try {
    const { data } = yield call(movieService.like, payload);
    yield put(setLiked(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* movieDislike({ payload }) {
  try {
    const { data } = yield call(movieService.dislike, payload);
    yield put(setLiked(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* movieRemoveLike({ payload }) {
  try {
    const { data } = yield call(movieService.removeLike, payload);
    yield put(setLiked(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* movieRemoveDislike({ payload }) {
  try {
    const { data } = yield call(movieService.removeDislike, payload);
    yield put(setLiked(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* commentAdd({ payload }) {
  try {
    const { data } = yield call(movieService.addComment, payload);
    yield put(setComment(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/movie/1'));
      yield put(go());
    } 
  }
}

export function* watchListGet() {
  try {
    yield put(setLoading(true));
    const { data } = yield call(movieService.getWatchList);
    yield put(setWatchList(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/watchlist'));
      yield put(go());
    } 
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchListAdd({ payload }){
  try {
    const { data } = yield call(movieService.addToWatchList, payload)
    yield put(setToWatchList(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* watchListRemove({ payload }) {
  try {
    const { data } = yield call(movieService.removeFromWatchList, payload);
    yield put(unsetFromWatchList(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* watchedAdd({ payload }) {
  try {
    const { data } = yield call(movieService.markAsWatched, payload);
    yield put(setAsWatched(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* mostPopularGet() {
  try {
    const { data } = yield call(movieService.getMostPopular);
    yield put(setMostPopular(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/home/1'));
      yield put(go());
    } 
  }
}

export function* commentsGet({ payload }) {
  try {
    const { data } = yield call(movieService.getComments, payload);
    yield put(setMoreComments(data));
    yield put(setCommentsActivePage(payload.page));
    if (payload.page === 1) {
      yield put(setCommentsFirstPageFetched(true));
    } else {
      yield put(setCommentsFirstPageFetched(false));
    }
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/movie/1'));
      yield put(go());
    } 
  }
}

export function* relatedGet({ payload }) {
  try {
    const { data } = yield call(movieService.getRelated, payload);
    yield put(setRelated(data));
  } catch (error) {
    if(error.response.data.status === "Token is Expired"){
      yield put(push('/movie/1'));
      yield put(go());
    } 
  }
}

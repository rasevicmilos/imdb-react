import { SET_OMDB_OPEN, GET_MOVIE_FROM_API, SET_MOVIE_NOT_FOUND, SET_OMDB_ACTIVE_MOVIE, SET_OMDB_CONFIRM_OPEN, ADD_MOVIE_FROM_OMDB } from './ActionTypes';

export const setOMDBOpen = payload => {
    return {
      type: SET_OMDB_OPEN,
      payload
    }
  }


export const getMovieFromApi = payload => {
  return {
    type: GET_MOVIE_FROM_API,
    payload
  }
}

export const setMovieNotFound = payload => {
  return {
    type: SET_MOVIE_NOT_FOUND,
    payload
  }
}

export const setActiveMovie = payload => {
  return {
    type: SET_OMDB_ACTIVE_MOVIE,
    payload
  }
}

export const setOMDBConfirmOpen = payload => {
  return {
    type: SET_OMDB_CONFIRM_OPEN,
    payload
  }
}

export const addMovieFromOMDB = payload => {
  return {
    type: ADD_MOVIE_FROM_OMDB,
    payload
  }
}
import { GET_MOVIES, SET_MOVIES, SET_PAGES, GET_MOVIE, SET_MOVIE, ADD_NEW_MOVIE, SET_NEW_MOVIE } from './ActionTypes';

export const getMovies = payload => {
  return {
    type: GET_MOVIES,
    payload
  };
};

export const setMovies = payload => {
  return {
    type: SET_MOVIES,
    payload
  };
};

export const setPages = payload => {
  return {
    type: SET_PAGES,
    payload
  }
}

export const getMovie = payload => {
  return {
    type: GET_MOVIE,
    payload
  }
}

export const setMovie = payload => {
  return {
    type: SET_MOVIE,
    payload
  }
}

export const addNewMovie = payload => {
  return {
    type: ADD_NEW_MOVIE,
    payload
  }
}

export const setNewMovie = payload => {
  return {
    type: SET_NEW_MOVIE,
    payload
  }
}
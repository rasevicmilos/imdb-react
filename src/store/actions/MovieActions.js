import { GET_MOVIES, SET_MOVIES, SET_PAGES } from './ActionTypes';

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
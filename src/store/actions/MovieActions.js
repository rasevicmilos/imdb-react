import { GET_MOVIES, SET_MOVIES, SET_PAGES, GET_MOVIE, SET_MOVIE, ADD_NEW_MOVIE, SET_NEW_MOVIE, SEARCH_MOVIES, SET_QUERY, LIKE_MOVIE, SET_LIKED, DISLIKE_MOVIE, REMOVE_LIKE, REMOVE_DISLIKE } from './ActionTypes';

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

export const searchMovies = payload => {
  return {
    type: SEARCH_MOVIES,
    payload
  }
}

export const setQuery = payload => {
  return {
    type: SET_QUERY,
    payload
  }
}

export const likeMovie = payload => {
  return {
    type: LIKE_MOVIE,
    payload
  }
}

export const setLiked = payload => {
  return {
    type: SET_LIKED,
    payload
  }
}

export const dislikeMovie = payload => {
  return {
    type: DISLIKE_MOVIE,
    payload
  }
}

export const removeLike = payload => {
  return {
    type: REMOVE_LIKE,
    payload
  }
}

export const removeDislike = payload => {
  return {
    type: REMOVE_DISLIKE,
    payload
  }
}
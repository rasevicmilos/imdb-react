import { GET_MOVIES, SET_MOVIES, SET_PAGES, GET_MOVIE, SET_MOVIE, ADD_NEW_MOVIE, SET_NEW_MOVIE, SEARCH_MOVIES, SET_QUERY, LIKE_MOVIE, SET_LIKED, DISLIKE_MOVIE, REMOVE_LIKE, REMOVE_DISLIKE, SET_GENRE, ADD_MOVIE_ERROR, SET_OPEN, SET_CLOSED, ADD_COMMENT, SET_COMMENT, GET_WATCHLIST, SET_WATCHLIST, ADD_TO_WATCHLIST, SET_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, UNSET_FROM_WATCHLIST, MARK_AS_WATCHED, SET_AS_WATCHED, GET_MOST_POPULAR, SET_MOST_POPULAR, SET_COMMENTS, SET_COMMENTS_ACTIVE_PAGE, SET_COMMENTS_FIRST_PAGE_FETCHED, GET_COMMENTS, SET_MORE_COMMENTS, GET_RELATED, SET_RELATED, SET_LOADING } from './ActionTypes';

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

export const setGenre = payload => {
  return {
    type: SET_GENRE,
    payload
  }
}

export const addMovieError = payload => {
  return {
    type: ADD_MOVIE_ERROR,
    payload
  }
}

export const setOpen = () => {
  return {
    type: SET_OPEN
  }
}

export const setClosed = () => {
  return {
    type: SET_CLOSED
  }
}

export const addComment = payload => {
  return {
    type: ADD_COMMENT,
    payload
  }
}

export const setComment = payload => {
  return {
    type: SET_COMMENT,
    payload
  }
}

export const getWatchList = () => {
  return {
    type: GET_WATCHLIST
  };
};

export const setWatchList = payload => {
  return {
    type: SET_WATCHLIST,
    payload
  };
};

export const addToWatchList = payload => {
  return {
    type: ADD_TO_WATCHLIST,
    payload
  }
}

export const setToWatchList = payload => {
  return {
    type: SET_TO_WATCHLIST,
    payload
  }
}

export const removeFromWatchList = payload => {
  return {
    type: REMOVE_FROM_WATCHLIST,
    payload
  }
}

export const unsetFromWatchList = payload => {
  return {
    type: UNSET_FROM_WATCHLIST,
    payload
  }
}

export const markAsWatched = payload => {
  return {
    type: MARK_AS_WATCHED,
    payload
  }
}

export const setAsWatched = payload => {
  return {
    type: SET_AS_WATCHED,
    payload
  }
}

export const getMostPopular = () => {
  return {
    type: GET_MOST_POPULAR
  }
}

export const setMostPopular = payload => {
  return {
    type: SET_MOST_POPULAR,
    payload
  }
}

export const setComments = payload => {
  return {
    type: SET_COMMENTS,
    payload
  }
}

export const setCommentsActivePage = payload => {
  return {
    type: SET_COMMENTS_ACTIVE_PAGE,
    payload
  }
}

export const setCommentsFirstPageFetched = payload => {
  return {
    type: SET_COMMENTS_FIRST_PAGE_FETCHED,
    payload
  }
}

export const getComments = payload => {
  return {
    type: GET_COMMENTS,
    payload
  }
}

export const setMoreComments = payload => {
  return {
    type: SET_MORE_COMMENTS,
    payload
  }
}

export const getRelated = payload => {
  return {
    type: GET_RELATED,
    payload
  }
}

export const setRelated = payload => {
  return {
    type: SET_RELATED,
    payload
  }
}

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}


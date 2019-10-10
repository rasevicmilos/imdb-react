import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies?page=',
  MOVIE: '/api/movies/',
  SEARCH: '/api/search?query=',
  LIKE: '/api/like/',
  DISLIKE: '/api/dislike/',
  REMOVE_LIKE: '/api/remove-like/',
  REMOVE_DISLIKE: '/api/remove-dislike/',
  ADD_COMMENT: '/api/comments',
  GET_WATCHLIST: 'api/get-movies',
  ADD_TO_WATCHLIST: 'api/add-to-watch-list/',
  REMOVE_FROM_WATCHLIST: 'api/remove-from-watch-list/',
  ADD_TO_WATCHED: 'api/add-to-watched/'
};

class MovieService extends ApiService {
  getMovies = (page) => {
    return this.apiClient.get(ENDPOINTS.MOVIES + page);
  };

  getMovie = (movieId) => {
    return this.apiClient.get(ENDPOINTS.MOVIE + movieId);
  }

  addNewMovie = (movie) => {
    return this.apiClient.post(ENDPOINTS.MOVIE, movie);
  }

  search = (payload) => {
    return this.apiClient.get(ENDPOINTS.SEARCH + payload.query + '&page=' + payload.page + '&genre=' + payload.genre);
  }

  like = (movieId) => {
    return this.apiClient.get(ENDPOINTS.LIKE + movieId);
  }

  dislike = (movieId) => {
    return this.apiClient.get(ENDPOINTS.DISLIKE + movieId);
  }

  removeLike = (movieId) => {
    return this.apiClient.get(ENDPOINTS.REMOVE_LIKE + movieId)
  }

  removeDislike = (movieId) => {
    return this.apiClient.get(ENDPOINTS.REMOVE_DISLIKE + movieId)
  }

  addComment = (comment) => {
    return this.apiClient.post(ENDPOINTS.ADD_COMMENT, comment);
  }

  getWatchList = () => {
    return this.apiClient.get(ENDPOINTS.GET_WATCHLIST);
  }

  addToWatchList = (movieId) => {
    return this.apiClient.get(ENDPOINTS.ADD_TO_WATCHLIST + movieId);
  }

  removeFromWatchList = (movieId) => {
    return this.apiClient.get(ENDPOINTS.REMOVE_FROM_WATCHLIST + movieId);
  }

  markAsWatched = (movieId) => {
    return this.apiClient.get(ENDPOINTS.ADD_TO_WATCHED + movieId);
  }
}

export const movieService = new MovieService();

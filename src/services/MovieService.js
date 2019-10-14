import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies?page=',
  MOVIE: '/api/movies/',
  SEARCH: '/api/search?query=',
  LIKE: '/api/like',
  DISLIKE: '/api/dislike',
  COMMENTS: '/api/comments',
  GET_WATCHLIST: 'api/get-movies',
  ADD_TO_WATCHLIST: 'api/add-to-watch-list/',
  REMOVE_FROM_WATCHLIST: 'api/remove-from-watch-list/',
  ADD_TO_WATCHED: 'api/add-to-watched/',
  MOST_POPULAR: 'api/most-popular',
  RELATED_MOVIES: 'api/related-movies/'
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
    return this.apiClient.put(ENDPOINTS.LIKE, {movie_id: movieId, like: true});
  }

  dislike = (movieId) => {
    return this.apiClient.put(ENDPOINTS.DISLIKE, {movie_id: movieId, dislike: true});
  }

  removeLike = (movieId) => {
    return this.apiClient.put(ENDPOINTS.LIKE, {movie_id: movieId, like: false});
  }

  removeDislike = (movieId) => {
    return this.apiClient.put(ENDPOINTS.DISLIKE, {movie_id: movieId, dislike: false});
  }

  addComment = (comment) => {
    return this.apiClient.post(ENDPOINTS.COMMENTS, comment);
  }

  getWatchList = () => {
    return this.apiClient.get(ENDPOINTS.GET_WATCHLIST);
  }

  addToWatchList = (movieId) => {
    return this.apiClient.get(ENDPOINTS.ADD_TO_WATCHLIST + movieId);
  }

  removeFromWatchList = (movieId) => {
    return this.apiClient.delete(ENDPOINTS.REMOVE_FROM_WATCHLIST + movieId);
  }

  markAsWatched = (movieId) => {
    return this.apiClient.put(ENDPOINTS.ADD_TO_WATCHED + movieId);
  }

  getMostPopular = () => {
    return this.apiClient.get(ENDPOINTS.MOST_POPULAR);
  }

  getLastPage = async (movieId) => {
    const { data } = await this.apiClient.get(ENDPOINTS.COMMENTS + '-last-page?movie=' + movieId);
    return data;
  }

  getComments = async (payload) => {
    const { data } = await this.apiClient.get(ENDPOINTS.COMMENTS + '?movie=' + payload.movieId + '&page=' + payload.page);
    return data;
  }

  getRelated = movieId => {
    return this.apiClient.get(ENDPOINTS.RELATED_MOVIES + movieId)
  }
}

export const movieService = new MovieService();

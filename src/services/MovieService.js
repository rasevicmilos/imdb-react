import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies?page=',
  MOVIE: '/api/movies/',
  SEARCH: '/api/search?query=',
  LIKE: '/api/like/',
  DISLIKE: '/api/dislike/',
  REMOVE_LIKE: '/api/remove-like/',
  REMOVE_DISLIKE: '/api/remove-dislike/'
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
    return this.apiClient.get(ENDPOINTS.SEARCH + payload.query + '&page=' + payload.page);
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
}

export const movieService = new MovieService();

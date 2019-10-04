import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies?page=',
  MOVIE: '/api/movies/',
  SEARCH: '/api/search?query='
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
    console.log(payload);
    return this.apiClient.get(ENDPOINTS.SEARCH + payload.query + '&page=' + payload.page);
  }
}

export const movieService = new MovieService();

import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies?page=',
  MOVIE: '/api/movies/'
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
}

export const movieService = new MovieService();

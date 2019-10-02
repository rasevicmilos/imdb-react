import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies?page='
};

class MovieService extends ApiService {
  getMovies = (page) => {
    return this.apiClient.get(ENDPOINTS.MOVIES + page);
  };
}

export const movieService = new MovieService();

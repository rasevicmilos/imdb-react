import ApiService from './ApiService';

const ENDPOINTS = {
    GENRES: '/api/genres'
};

class GenreService extends ApiService {
    getGenres = () => {
        return this.apiClient.get(ENDPOINTS.GENRES);
    }
}

export const genreService = new GenreService();
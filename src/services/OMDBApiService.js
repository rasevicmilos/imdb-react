import ApiService from './ApiService';

const OMDB_API = 'http://www.omdbapi.com';
const API_KEY = 'f03cf1d0';

const ENDPOINTS = {
    ADD_MOVIE_FROM_OMDB: 'api/add-movie-from-omdb'
}

class OMDBApiService extends ApiService {
    getMovieFromApi = async (movie) => {
        const response = await fetch(OMDB_API + '?t=' + movie.title + '&apikey=' + API_KEY);
        const data = await response.json();
        return data
    }

    getMovieFromApiByYear = async (movie) => {
        const response = await fetch(OMDB_API + '?t=' + movie.title + '&y=' + movie.year + '&apikey=' + API_KEY);
        const data = await response.json();
        return data
    }

    addNewMovie = (movie) => {
        return this.apiClient.post(ENDPOINTS.ADD_MOVIE_FROM_OMDB, movie);
    }
}

export const omdbApiService = new OMDBApiService();
import { call, put } from 'redux-saga/effects';
import { genreService } from '../../services/GenreService';
import { setGenres } from '../actions/GenreActions';

export function* genresGet() {
    try {
        const { data } = yield call(genreService.getGenres);
        yield put(setGenres(data));
    } catch (error) {
        console.log(error);
    }
}
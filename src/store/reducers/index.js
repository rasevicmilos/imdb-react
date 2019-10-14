import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import movieReducer from './MovieReducer';
import genreReducer from './GenreReducer';
import omdbReducer from './OMDBReducer';

export default history =>
  combineReducers({
    authUser: authReducer,
    error: errorReducer,
    movie: movieReducer,
    genre: genreReducer,
    omdb: omdbReducer,
    router: connectRouter(history)
  });

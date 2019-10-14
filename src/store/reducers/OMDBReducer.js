import { SET_OMDB_OPEN, SET_MOVIE_NOT_FOUND, SET_OMDB_ACTIVE_MOVIE, SET_OMDB_CONFIRM_OPEN } from '../actions/ActionTypes';

const initialState = {
    omdbDialogOpen: false,
    movieNotFound: false,
    activeMovie: {},
    omdbConfirmOpen: false
}

const omdbReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_OMDB_OPEN:
            return { ...state, omdbDialogOpen: action.payload}
        case SET_MOVIE_NOT_FOUND:
            return { ...state, movieNotFound: action.payload}
        case SET_OMDB_ACTIVE_MOVIE:
            return { ...state, activeMovie: action.payload}
        case SET_OMDB_CONFIRM_OPEN:
            return { ...state, omdbConfirmOpen: action.payload}
        default:
            return state;
    }
}

export default omdbReducer;
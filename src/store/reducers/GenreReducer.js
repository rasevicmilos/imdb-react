import { SET_GENRES } from "../actions/ActionTypes";

const initState = {
    genres: []
};

const genreReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_GENRES:
            return {...state, genres: action.payload};
        default: 
            return state;
    }
}

export default genreReducer;
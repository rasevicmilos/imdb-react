import { SET_MOVIES, SET_PAGES } from '../actions/ActionTypes';

const initialState = {
  all: [],
  pages: 1
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, all: action.payload };
    case SET_PAGES:
      return { ...state, pages: action.payload };
    default:
      return state;
  }
};

export default movieReducer;

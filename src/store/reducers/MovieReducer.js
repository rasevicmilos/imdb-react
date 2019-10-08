import { SET_MOVIES, SET_PAGES, SET_MOVIE, SET_NEW_MOVIE, SET_QUERY, SET_LIKED, SET_GENRE } from '../actions/ActionTypes';

const initialState = {
  all: [],
  pages: 1,
  activeMovie: {},
  queryString: '',
  activeGenre: 0
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, all: action.payload };
    case SET_PAGES:
      return { ...state, pages: action.payload };
    case SET_MOVIE:
      return { ...state, activeMovie: action.payload};
    case SET_NEW_MOVIE:
      return { ...state, all: [...state.all, action.payload] }
    case SET_QUERY:
      return { ...state, queryString: action.payload}
    case SET_GENRE:
      return { ...state, activeGenre: action.payload}
    case SET_LIKED:
      return { ...state, activeMovie: action.payload, all: state.all.map(movie => 
        movie.id === action.payload.id
          ? action.payload
          : movie
        )
      }
    default:
      return state;
  }
};

export default movieReducer;

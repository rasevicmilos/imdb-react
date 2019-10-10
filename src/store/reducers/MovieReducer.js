import { SET_MOVIES, SET_PAGES, SET_MOVIE, SET_NEW_MOVIE, SET_QUERY, SET_LIKED, SET_GENRE, SET_OPEN, SET_CLOSED, SET_COMMENT, SET_WATCHLIST, SET_TO_WATCHLIST, UNSET_FROM_WATCHLIST, SET_AS_WATCHED } from '../actions/ActionTypes';

const initialState = {
  all: [],
  pages: 1,
  activeMovie: {},
  queryString: '',
  activeGenre: 0,
  dialogOpen: false,
  moviesInWatchList: []
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
      return { ...state, all: [ action.payload, ...state.all] }
    case SET_QUERY:
      return { ...state, queryString: action.payload}
    case SET_GENRE:
      return { ...state, activeGenre: action.payload}
    case SET_LIKED:
      return { ...state, activeMovie: action.payload, all: state.all.map(movie => 
        movie.id === action.payload.id
          ? action.payload
          : movie
        ),
        moviesInWatchList: state.moviesInWatchList.map(movie =>
          movie.id === action.payload.id
            ? action.payload
            : movie
        )
      }
    case SET_OPEN:
      return { ...state, dialogOpen: true}
    case SET_CLOSED: 
      return { ...state, dialogOpen: false}
    case SET_COMMENT:
      return { ...state, activeMovie: {...state.activeMovie, comments: [ ...state.activeMovie.comments, action.payload] }}
    case SET_WATCHLIST:
      return { ...state, moviesInWatchList: action.payload }
    case SET_TO_WATCHLIST:
      return { ...state, all: state.all.map(movie => 
        movie.id === action.payload.id
          ? action.payload
          : movie
        ),
        activeMovie: action.payload
      }
    case UNSET_FROM_WATCHLIST:
      return { ...state, activeMovie: action.payload, all: state.all.map(movie => 
        movie.id === action.payload.id
          ? action.payload
          : movie
        ),
        moviesInWatchList: state.moviesInWatchList.filter(movie => movie.id !== action.payload.id)
      }
    case SET_AS_WATCHED:
      return { ...state, activeMovie: action.payload, moviesInWatchList: state.moviesInWatchList.map(movie => 
        movie.id === action.payload.id
          ? action.payload
          : movie
        ),
        all: state.all.map(movie => 
          movie.id === action.payload.id
            ? action.payload
            : movie
        )}
    default:
      return state;
  }
};

export default movieReducer;

import { SET_MOVIES, SET_PAGES, SET_MOVIE, SET_NEW_MOVIE, SET_QUERY, SET_LIKED, SET_GENRE, SET_OPEN, SET_CLOSED, SET_COMMENT, SET_WATCHLIST, SET_TO_WATCHLIST, UNSET_FROM_WATCHLIST, SET_AS_WATCHED, SET_MOST_POPULAR, SET_COMMENTS, SET_COMMENTS_FIRST_PAGE_FETCHED, SET_COMMENTS_ACTIVE_PAGE, SET_MORE_COMMENTS, SET_RELATED, SET_LOADING} from '../actions/ActionTypes';

const initialState = {
  all: [],
  pages: 1,
  activeMovie: {},
  queryString: '',
  activeGenre: 0,
  dialogOpen: false,
  moviesInWatchList: [],
  mostPopular: [],
  activeMovieComments: [],
  commentsActivePage: 0,
  commentsFirstPageFetched: false,
  relatedMovies: [],
  loading: false
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
      return { ...state, activeMovieComments: [ ...state.activeMovieComments, action.payload] }
    case SET_COMMENTS:
      return { ...state, activeMovieComments: action.payload}
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
    case SET_MOST_POPULAR:
      return { ...state, mostPopular: action.payload}
    case SET_COMMENTS_ACTIVE_PAGE:
      return { ...state, commentsActivePage: action.payload}
    case SET_COMMENTS_FIRST_PAGE_FETCHED:
      return { ...state, commentsFirstPageFetched: action.payload}
    case SET_MORE_COMMENTS: 
      return { ...state, activeMovieComments: [...action.payload, ...state.activeMovieComments]}
    case SET_RELATED:
      return { ...state, relatedMovies: action.payload}
    case SET_LOADING:
      return { ...state, loading: action.payload}
    default:
      return state;
  }
};

export default movieReducer;

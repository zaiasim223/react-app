import * as types from "../action-types"
const initMovieInfo = {
  moviesList: [],
  loading: {
    listing: false
  },

};
export default function movies(state = initMovieInfo, action) {
  switch (action.type) {

    case types.GET_MOVIE_LIST:
      console.log(action.response, 'GET_MOVIE_LIST');
      return {
        ...state,
        moviesList: action.response,
        loading: { ...state.loading, listing: false }
      };

    case types.ADD_MOVIE: {
      state.moviesList.push(action.response);
      return {
        ...state,
        moviesList: state.moviesList,
        loading: { ...state.loading, movieModal: false }
      }
    }

    case types.EDIT_MOVIE: {
      const index = state.moviesList.findIndex(item => item.id === action.response.id);
      if (index > -1) {
        state.moviesList[index] = action.response;
        console.log(index, 'index ', state.moviesList[index]);
      }
      return {
        ...state,
        moviesList: [...state.moviesList],
        loading: { ...state.loading, movieModal: false }
      }
    }

    case types.DELETE_MOVIE: {
      const filteredArray = state.moviesList.filter(item => item.id !== action.id);
      return {
        ...state,
        moviesList: filteredArray,
        loading: { ...state.loading, movieModal: false }
      }
    }


    case types.TOGGLE_MOVIE_LOADING: {
      console.log(action.response, 'TOGGLE_MOVIE_LOADING');
      return {
        ...state,
        loading: { ...state.loading, ...action.loading }
      };
    }

    default:
      return state;
  }
}

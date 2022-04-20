import * as types from "../action-types"
const initBookInfo = {
  booksList: [],
  loading: {
    listing: false
  },

};
export default function books(state = initBookInfo, action) {
  switch (action.type) {

    case types.GET_BOOK_LIST:
      console.log(action.response, 'GET_BOOK_LIST');
      return {
        ...state,
        booksList: action.response,
        loading: { ...state.loading, listing: false }
      };

    case types.ADD_BOOK: {
      state.booksList.push(action.response);
      return {
        ...state,
        booksList: state.booksList,
        loading: { ...state.loading, bookModal: false }
      }
    }

    case types.EDIT_BOOK: {
      const index = state.booksList.findIndex(item => item.id === action.response.id);
      if (index > -1) {
        state.booksList[index] = action.response;
        console.log(index, 'index ', state.booksList[index]);
      }
      return {
        ...state,
        booksList: [...state.booksList],
        loading: { ...state.loading, bookModal: false }
      }
    }

    case types.DELETE_BOOK: {
      const filteredArray = state.booksList.filter(item => item.id !== action.id);
      return {
        ...state,
        booksList: filteredArray,
        loading: { ...state.loading, bookModal: false }
      }
    }


    case types.TOGGLE_BOOK_LOADING: {
      console.log(action.response, 'TOGGLE_BOOK_LOADING');
      return {
        ...state,
        loading: { ...state.loading, ...action.loading }
      };
    }

    default:
      return state;
  }
}

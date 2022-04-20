import * as types from "../action-types"
const initQuoteInfo = {
  quotesList: [],
  loading: {
    listing: false
  },

};
export default function quotes(state = initQuoteInfo, action) {
  switch (action.type) {

    case types.GET_QUOTE_LIST:
      console.log(action.response, 'GET_QUOTE_LIST');
      return {
        ...state,
        quotesList: action.response,
        loading: { ...state.loading, listing: false }
      };

    case types.ADD_QUOTE: {
      console.log(action.response, 'action.response', state.quotesList);
      state.quotesList.push(action.response);
      return {
        ...state,
        quotesList: state.quotesList,
        loading: { ...state.loading, quoteModal: false }
      }
    }

    case types.EDIT_QUOTE: {
      const index = state.quotesList.findIndex(item => item.id === action.response.id);
      if (index > -1) {
        state.quotesList[index] = action.response;
        console.log(index, 'index ', state.quotesList[index]);
      }
      return {
        ...state,
        quotesList: [...state.quotesList],
        loading: { ...state.loading, quoteModal: false }
      }
    }

    case types.DELETE_QUOTE: {
      const filteredArray = state.quotesList.filter(item => item.id !== action.id);
      return {
        ...state,
        quotesList: filteredArray,
        loading: { ...state.loading, quoteModal: false }
      }
    }


    case types.TOGGLE_QUOTE_LOADING: {
      console.log(action.response, 'TOGGLE_QUOTE_LOADING');
      return {
        ...state,
        loading: { ...state.loading, ...action.loading }
      };
    }

    default:
      return state;
  }
}

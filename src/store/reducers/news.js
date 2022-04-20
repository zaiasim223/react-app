import * as types from "../action-types"
const initNewsInfo = {
  newsList: [],
  loading: {
    listing: false
  },

};
export default function news(state = initNewsInfo, action) {
  switch (action.type) {

    case types.GET_NEWS_LIST:
      console.log(action.response, 'GET_NEWS_LIST');
      return {
        ...state,
        newsList: action.response,
        loading: { ...state.loading, listing: false }
      };

    case types.ADD_NEWS: {
      console.log(action.response, 'action.response', state.newsList);
      state.newsList.push(action.response);
      return {
        ...state,
        newsList: state.newsList,
        loading: { ...state.loading, newsModal: false }
      }
    }

    case types.EDIT_NEWS: {
      const index = state.newsList.findIndex(item => item.id === action.response.id);
      if (index > -1) {
        state.newsList[index] = action.response;
        console.log(index, 'index ', state.newsList[index]);
      }
      return {
        ...state,
        newsList: [...state.newsList],
        loading: { ...state.loading, newsModal: false }
      }
    }

    case types.DELETE_NEWS: {
      const filteredArray = state.newsList.filter(item => item.id !== action.id);
      return {
        ...state,
        newsList: filteredArray,
        loading: { ...state.loading, newsModal: false }
      }
    }


    case types.TOGGLE_NEWS_LOADING: {
      console.log(action.response, 'TOGGLE_NEWS_LOADING');
      return {
        ...state,
        loading: { ...state.loading, ...action.loading }
      };
    }

    default:
      return state;
  }
}

import * as types from "../action-types"
const initUserInfo = {
  usersList: [],
  loading: {
    listing: false
  },

};
export default function users(state = initUserInfo, action) {
  switch (action.type) {

    case types.GET_USER_LIST:
      console.log(action.response, 'GET_USER_LIST');
      return {
        ...state,
        usersList: action.response,
        loading: { ...state.loading, listing: false }
      };

    case types.ADD_USER: {
      console.log(action.response, 'action.response', state.usersList);
      state.usersList.push(action.response);
      return {
        ...state,
        usersList: state.usersList,
        loading: { ...state.loading, userModal: false }
      }
    }

    case types.EDIT_USER: {
      const index = state.usersList.findIndex(item => item.id === action.response.id);
      if (index > -1) {
        state.usersList[index] = action.response;
        console.log(index, 'index ', state.usersList[index]);
      }
      return {
        ...state,
        usersList: [...state.usersList],
        loading: { ...state.loading, userModal: false }
      }
    }

    case types.DELETE_USER: {
      const filteredArray = state.usersList.filter(item => item.id !== action.id);
      return {
        ...state,
        usersList: filteredArray,
        loading: { ...state.loading, userModal: false }
      }
    }


    case types.TOGGLE_USER_LOADING: {
      console.log(action.response, 'TOGGLE_USER_LOADING');
      return {
        ...state,
        loading: { ...state.loading, ...action.loading }
      };
    }

    default:
      return state;
  }
}

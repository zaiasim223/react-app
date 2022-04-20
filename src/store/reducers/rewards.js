import * as types from "../action-types"
const initRewardInfo = {
  rewardsList: [],
  loading: {
    listing: false
  },

};
export default function rewards(state = initRewardInfo, action) {
  switch (action.type) {

    case types.GET_REWARD_LIST:
      console.log(action.response, 'GET_REWARD_LIST');
      return {
        ...state,
        rewardsList: action.response,
        loading: { ...state.loading, listing: false }
      };

    case types.ADD_REWARD: {
      state.rewardsList.push(action.response);
      return {
        ...state,
        rewardsList: state.rewardsList,
        loading: { ...state.loading, rewardModal: false }
      }
    }

    case types.EDIT_REWARD: {
      console.log(state.rewardsList, 'state.rewardsList');
      const index = state.rewardsList.findIndex(item => item.id === action.response.id);
      if (index > -1) {
        state.rewardsList[index] = action.response;
        console.log(index, 'index ', state.rewardsList[index]);
      }
      return {
        ...state,
        rewardsList: [...state.rewardsList],
        loading: { ...state.loading, rewardModal: false }
      }
    }

    case types.DELETE_REWARD: {
      const filteredArray = state.rewardsList.filter(item => item.id !== action.id);
      return {
        ...state,
        rewardsList: filteredArray,
        loading: { ...state.loading, rewardModal: false }
      }
    }


    case types.TOGGLE_REWARD_LOADING: {
      console.log(action.response, 'TOGGLE_REWARD_LOADING');
      return {
        ...state,
        loading: { ...state.loading, ...action.loading }
      };
    }

    default:
      return state;
  }
}

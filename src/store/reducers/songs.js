import * as types from "../action-types"
const initSongInfo = {
  songsList: [],
  loading: {
    listing: false
  },

};
export default function songs(state = initSongInfo, action) {
  switch (action.type) {

    case types.GET_SONG_LIST:
      console.log(action.response, 'GET_SONG_LIST');
      return {
        ...state,
        songsList: action.response,
        loading: { ...state.loading, listing: false }
      };

    case types.ADD_SONG: {
      state.songsList.push(action.response);
      return {
        ...state,
        songsList: state.songsList,
        loading: { ...state.loading, songModal: false }
      }
    }

    case types.EDIT_SONG: {
      const index = state.songsList.findIndex(item => item.id === action.response.id);
      if (index > -1) {
        state.songsList[index] = action.response;
        console.log(index, 'index ', state.songsList[index]);
      }
      return {
        ...state,
        songsList: [...state.songsList],
        loading: { ...state.loading, songModal: false }
      }
    }

    case types.DELETE_SONG: {
      const filteredArray = state.songsList.filter(item => item.id !== action.id);
      return {
        ...state,
        songsList: filteredArray,
        loading: { ...state.loading, songModal: false }
      }
    }


    case types.TOGGLE_SONG_LOADING: {
      console.log(action.response, 'TOGGLE_SONG_LOADING');
      return {
        ...state,
        loading: { ...state.loading, ...action.loading }
      };
    }

    default:
      return state;
  }
}

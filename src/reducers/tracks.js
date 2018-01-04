import * as actionTypes from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  trackList: [],
  nowPlaying: {},
}

export default function search(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: false,
      }
    case actionTypes.TRACKS_FETCH_SUCCESS:
      return {
        ...state,
        trackList: action.tracks,
      }
    case actionTypes.TRACKS_FETCH_FAIL:
      return state
    case actionTypes.SET_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.track,
      }
    default:
      return state
  }
}

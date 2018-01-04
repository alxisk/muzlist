import * as actionTypes from '../constants/actionTypes'

export const requestTracks = query => ({
  type: actionTypes.TRACKS_FETCH_REQUEST,
  query,
})

export const setNowPlaying = track => ({
  type: actionTypes.SET_NOW_PLAYING,
  track,
})

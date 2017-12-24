import * as actionTypes from '../constants/actionTypes'

export const requestTracks = query => ({
  type: actionTypes.REQUEST_TRACKS,
  query,
})

export const setNowPlaying = track => ({
  type: actionTypes.SET_NOW_PLAYING,
  track,
})

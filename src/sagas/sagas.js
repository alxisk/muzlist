import { call, put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../constants/actionTypes'
import { getTracks } from '../utils/soundCloudApi'

export function* fetchTracks(action) {
  try {
    const tracks = yield call(getTracks, action.query)
    yield put({
      type: actionTypes.TRACKS_FETCH_SUCCESS,
      tracks: tracks.filter(track => track.artwork_url),
    })
  } catch (error) {
    yield put({ type: actionTypes.TRACKS_FETCH_FAIL, error })
  }
}

export function* watchFetchTracks() {
  yield takeEvery(actionTypes.TRACKS_FETCH_REQUEST, fetchTracks)
}

import { all } from 'redux-saga/effects';
import 'regenerator-runtime/runtime';
import { watchFetchTracks } from './sagas';

export default function* rootSaga() {
  yield all([
    watchFetchTracks(),
  ]);
}

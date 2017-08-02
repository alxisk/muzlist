import { all } from 'redux-saga/effects';
import 'regenerator-runtime/runtime';
import { testSaga } from './sagas';

export default function* rootSaga() {
  yield all([
    testSaga,
  ]);
}

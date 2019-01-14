import { all, fork } from 'redux-saga/effects';
import { firebaseSaga } from './firebase';

export default function* rootSaga() {
  yield all([
    fork(firebaseSaga),
  ]);
}

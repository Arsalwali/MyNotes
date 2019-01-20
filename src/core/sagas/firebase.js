import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actionTypes/firebase';

export function* firebaseSaga() {
  const refs = firebase.firestore().collection('notes');
  yield takeEvery([ADD_NOTE, EDIT_NOTE, DELETE_NOTE], callFirestore, refs);
}

export function* callFirestore(refs, action) {
  const { key, title, note, color } = action.payload;
  if (action.type === ADD_NOTE) {
    refs.add({
      title,
      note,
      color,
    }).then(() => console.warn('add success'))
    .catch((error) => console.warn('add error'));
  } else if (action.type === EDIT_NOTE) {
    refs.doc(key).update({
      title,
      note,
      color,
    }).then(() => console.warn('edit success'))
    .catch((error) => console.warn('edit error'));
  } else if (action.type === DELETE_NOTE) {
    refs.doc(key).delete()
    .then(() => console.warn('delete success'))
    .catch((error) => console.warn('delete error'));
  }
}
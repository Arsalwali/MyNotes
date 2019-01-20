import { select, takeEvery, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { firebaseSaga, callFirestore } from "./firebase";
import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actionTypes/firebase';
// import firebase from 'react-native-firebase';


// jest.mock('react-native-firebase');
// beforeEach(() => {
//   jest.resetAllMocks();
// });


describe('firebaseSaga', () => {
  it('should work', () => {
    const firebase = require.requireMock('react-native-firebase').default;
    const refs = firebase.firestore().collection();
    
    const iterator = firebaseSaga();
    const expectedYield = fork(takeEvery, [ADD_NOTE, EDIT_NOTE, DELETE_NOTE], callFirestore, refs);
    const actualYield = iterator.next().value;
    expect(JSON.stringify(actualYield)).toEqual(JSON.stringify(expectedYield));
  });
});

describe('callFirestore', () => {
  it('should add note for add action', () => {
    const firebase = require.requireMock('react-native-firebase').default;
    const refs = firebase.firestore().collection();
    const action = {
      type: ADD_NOTE,
      payload: {
        key: null,
        title: 'Imp Note',
        note: 'Some text',
        color: '#f0f0f0',
      }
    }

    const iterator = callFirestore(refs, action);
    expect(refs.add.mock.calls.length).toBe(0);
    iterator.next();
    expect(refs.add.mock.calls.length).toBe(1);
  });

  it('should edit note for edit action', () => {
    const firebase = require.requireMock('react-native-firebase').default;
    const refs = firebase.firestore().collection();
    const action = {
      type: EDIT_NOTE,
      payload: {
        key: '123',
        title: 'Imp Note',
        note: 'Some text',
        color: '#f0f0f0',
      }
    }

    const iterator = callFirestore(refs, action);
    expect(refs.doc.mock.calls.length).toBe(0);
    iterator.next();
    expect(refs.doc.mock.calls.length).toBe(1);
  });

  it('should delete note for delete action', () => {
    const firebase = require.requireMock('react-native-firebase').default;
    const refs = firebase.firestore().collection();
    const action = {
      type: DELETE_NOTE,
      payload: {
        key: '123',
      }
    }

    const iterator = callFirestore(refs, action);
    expect(refs.doc.mock.calls.length).toBe(0);
    iterator.next();
    expect(refs.doc.mock.calls.length).toBe(1);
  });

  it('should do nothing for invalid action', () => {
    const firebase = require.requireMock('react-native-firebase').default;
    const refs = firebase.firestore().collection();
    const action = {
      type: 'ACTION',
      payload: {
        key: '123',
      }
    }

    const iterator = callFirestore(refs, action);
    expect(refs.add.mock.calls.length).toBe(0);
    expect(refs.doc.mock.calls.length).toBe(0);
    iterator.next();
    expect(refs.add.mock.calls.length).toBe(0);
    expect(refs.doc.mock.calls.length).toBe(0);
  });
});
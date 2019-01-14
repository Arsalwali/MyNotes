import * as types from '../actionTypes/firebase';
import * as actions from './firebase';

describe('Firebase creators', () =>{
  it('should return proper addNote action', () => {
    const payload = {
      key: null,
      title: 'some',
      note: 'text',
      color: '#626262',
    }
    const expectedAction = { type: types.ADD_NOTE, payload };
    expect(actions.addNote(payload)).toEqual(expectedAction);
  });

  it('should return proper editNote action', () => {
    const payload = {
      key: '123',
      title: 'some',
      note: 'text',
      color: '#626262',
    }
    const expectedAction = { type: types.EDIT_NOTE, payload };
    expect(actions.editNote(payload)).toEqual(expectedAction);
  });

  it('should return proper deleteNote action', () => {
    const payload = {
      key: '123',
    }
    const expectedAction = { type: types.DELETE_NOTE, payload };
    expect(actions.deleteNote(payload)).toEqual(expectedAction);
  });
  
});
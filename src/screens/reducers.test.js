import deepFreeze from 'deep-freeze';
import * as types from './actionTypes';
import reducer, { INITIAL_STATE } from './reducers';

describe('Time clock reducer', () => {
  beforeAll(() => {
    deepFreeze(INITIAL_STATE);
  });

  it('should return the initial state when undefined state is given as a parameter', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should show modal with all action property for show modal action', () => {
    const payload = {
      key: 'key1',
      title: 'First Note',
      note: 'This is a note.',
      color: '#d81b60',
    };
    const action = {
      type: types.SHOW_MODAL,
      payload,
    };

    const expectedState = {
      key: 'key1',
      title: 'First Note',
      note: 'This is a note.',
      color: '#d81b60',
      isVisible: true,
    }

    deepFreeze(action);
    expect(reducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should hide modal for hide modal action', () => {
    const currentState = {
      key: 'key1',
      title: 'First Note',
      note: 'This is a note.',
      color: '#d81b60',
      isVisible: true,
    }

    const action = {
      type: types.HIDE_MODAL,
    };

    const expectedState = {
      key: 'key1',
      title: 'First Note',
      note: 'This is a note.',
      color: '#d81b60',
      isVisible: false,
    }

    deepFreeze(action);
    expect(reducer(currentState, action)).toEqual(expectedState);
  });

  it('should set color for set color action', () => {
    const currentState = {
      key: 'key1',
      title: 'First Note',
      note: 'This is a note.',
      color: '#d81b60',
      isVisible: false,
    }

    const action = {
      type: types.SET_COLOR,
      payload: '#e74c3c',
    };

    const expectedState = {
      key: 'key1',
      title: 'First Note',
      note: 'This is a note.',
      color: '#e74c3c',
      isVisible: false,
    }

    deepFreeze(action);
    expect(reducer(currentState, action)).toEqual(expectedState);
  });

});
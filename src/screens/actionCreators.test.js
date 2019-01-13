import * as types from './actionTypes';
import * as actions from './actionCreators';

describe('Note action creators', () =>{
  it('should return proper setColor action', () => {
    const color = '#5d7a90';
    const expectedAction = { type: types.SET_COLOR, payload: color };
    expect(actions.setColor(color)).toEqual(expectedAction);
  });

  it('should return proper show modal action', () => {
    const color = '#5d7a90';
    const expectedAction = {
      type: types.SHOW_MODAL,
      payload: { 
        key: 'key1',
        title: 'Imp',
        note: 'This is important note',
        color: '#808080',
      },
    };
    expect(actions.showModal('key1', 'Imp', 'This is important note', '#808080')).toEqual(expectedAction);
  });

  it('should return proper hide modal action', () => {
    const expectedAction = { type: types.HIDE_MODAL };
    expect(actions.hideModal()).toEqual(expectedAction);
  });
});
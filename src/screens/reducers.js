import { SHOW_MODAL, HIDE_MODAL, SET_COLOR } from './actionTypes';

export const INITIAL_STATE = {
  isVisible: false,
  title: '',
  note: '',
  key: '',
  color: '',
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SHOW_MODAL:
      return { ...state, ...action.payload, isVisible: true }
    case HIDE_MODAL:
      return { ...state, isVisible: false }
    case SET_COLOR:
      return { ...state, color: action.payload };
    default:
      return state;
  }
};
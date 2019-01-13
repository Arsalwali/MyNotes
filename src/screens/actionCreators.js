import { SHOW_MODAL, HIDE_MODAL, SET_COLOR } from './actionTypes';

export const showModal = (key, title, note, color) => ({
  type: SHOW_MODAL,
  payload: { 
    key,
    title,
    note,
    color,
  },
});
export const hideModal = () => ({ type: HIDE_MODAL });
export const setColor = (color) => ({ type: SET_COLOR, payload: color })

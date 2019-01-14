import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actionTypes/firebase';

export const addNote = (payload) => ({
  type: ADD_NOTE,
  payload,
});

export const editNote = (payload) => ({
  type: EDIT_NOTE,
  payload,
});

export const deleteNote = (payload) => ({
  type: DELETE_NOTE,
  payload,
});




import {
  ADD_TODO,
  CANCEL_EDIT,
  DELETE_TODO,
  SAVE_TODO,
  START_EDIT
} from '../constants/actionTypes';

export const addTodo = todo => (
  {
    type: ADD_TODO,
    payload: todo
  });

export const deleteTodo = todo => (
  {
    type: DELETE_TODO,
    payload: todo
  });

export const saveTodo = todo => (
  {
    type: SAVE_TODO,
    payload: todo
  });

export const startEdit = todo => (
  {
    type: START_EDIT,
    payload: todo
  });

export const cancelEdit = todo => (
  {
    type: CANCEL_EDIT,
    payload: todo
  });

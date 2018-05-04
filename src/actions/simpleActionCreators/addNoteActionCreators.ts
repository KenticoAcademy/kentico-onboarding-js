import {
  ADD_NOTE_FOCUS,
  ADD_NOTE_BLUR,
  ADD_NOTE_TEXT_CHANGE,
} from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const startAddingNote = (): IAction => ({
  type: ADD_NOTE_FOCUS,
});

export const stopAddingNote = (): IAction => ({
  type: ADD_NOTE_BLUR,
});

export const changeAddingNoteText = (newText: string): IAction => ({
  type: ADD_NOTE_TEXT_CHANGE,
  payload: {
    newText,
  }
});

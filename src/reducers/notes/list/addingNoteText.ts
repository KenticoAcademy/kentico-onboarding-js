import { IAction } from '../../../models/IAction';
import {
  ADD_NOTE,
  ADD_NOTE_TEXT_CHANGE
} from '../../../constants/actionTypes';

const DEFAULT_STATE = '';

export const addNoteText = (state = DEFAULT_STATE, action: IAction): string => {
  switch (action.type) {
    case ADD_NOTE_TEXT_CHANGE:
      return action.payload.newText;
    case ADD_NOTE:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

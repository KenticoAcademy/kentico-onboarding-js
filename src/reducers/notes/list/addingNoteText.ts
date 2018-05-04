import { IAction } from '../../../actions/IAction';
import {
  ADD_NOTE_TEXT_CHANGE,
  START_SENDING_NOTE_TO_SERVER,
} from '../../../constants/actionTypes';

const DEFAULT_STATE = '';

export const addNoteText = (state = DEFAULT_STATE, action: IAction): string => {
  switch (action.type) {
    case ADD_NOTE_TEXT_CHANGE:
      return action.payload.newText;

    case START_SENDING_NOTE_TO_SERVER:
      return DEFAULT_STATE;

    default:
      return state;
  }
};

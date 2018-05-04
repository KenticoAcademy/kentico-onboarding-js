import {
  ADD_NOTE_FOCUS,
  ADD_NOTE_BLUR,
} from '../../../constants/actionTypes';
import { IAction } from '../../../actions/IAction';

export const isAddingNote = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case ADD_NOTE_FOCUS:
      return true;

    case ADD_NOTE_BLUR:
      return false;

    default:
      return state;
  }
};

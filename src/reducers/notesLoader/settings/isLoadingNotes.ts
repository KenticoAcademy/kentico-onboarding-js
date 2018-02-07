import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES,
} from '../../../constants/actionTypes';
import { IAction } from '../../../models/IAction';

export const isLoadingNotes = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case START_LOADING_NOTES:
      return true;
    case LOADING_NOTES_FAILURE:
      return false;
    case LOADING_NOTES_SUCCESS:
      return false;
    default:
      return state;
  }
};
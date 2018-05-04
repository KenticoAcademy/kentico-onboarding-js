import {
  LOADING_NOTES_FAILURE,
  START_LOADING_NOTES
} from '../../../../constants/actionTypes';
import { IAction } from '../../../../actions/IAction';

export const errorId = (state: string | null = null, action: IAction): string | null => {
  switch (action.type) {
    case LOADING_NOTES_FAILURE:
      return action.payload.errorId;

    case START_LOADING_NOTES:
      return null;

    default:
      return state;
  }
};

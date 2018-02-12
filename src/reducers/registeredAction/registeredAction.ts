import { IAction } from '../../models/interfaces/IAction';
import { REGISTER_ACTION } from '../../constants/actionTypes';

export const registeredAction = (state: () => void = () => null, action: IAction): () => void => {
  switch (action.type) {
    case REGISTER_ACTION:
      return action.payload.action;

    default:
      return state;
  }
};

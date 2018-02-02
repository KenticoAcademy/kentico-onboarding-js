import { IAction } from '../../models/IAction';
import { REGISTER_ACTION } from '../../constants/actionTypes';

const registerAction = (action: IAction) => action.payload.action;

export const registeredAction = (state: () => void = () => null, action: IAction): () => void => {
  switch (action.type) {
    case REGISTER_ACTION:
      return registerAction(action);

    default:
      return state;
  }
};

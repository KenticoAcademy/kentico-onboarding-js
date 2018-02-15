import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';

interface UpdateItemArguments {
  id: Uuid;
  text: string;
}

export const optimisticUpdateFactory =
  (updateItemLocally: (args: UpdateItemArguments) => IAction,
   putItem: (id: Uuid, text: string) => (dispatch: Dispatch<IAppState>) => Promise<void | IAction>) =>
    (id: Uuid, text: string) =>
      (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
        dispatch(updateItemLocally({
          id,
          text
        }));
        return dispatch(putItem(id, text));
      };

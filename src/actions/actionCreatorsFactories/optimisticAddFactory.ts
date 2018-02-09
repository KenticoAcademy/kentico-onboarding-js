import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';

interface InsertItemArguments {
  text: string;
  id: Uuid;
  isSynchronized: boolean;
}

export const optimisticAddFactory =
  (generateId: () => Uuid,
   insertItemToList: (args: InsertItemArguments) => IAction,
   postItem: (id: Uuid, text: string) => any) =>
    (text: string) =>
      (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
        const tempId = generateId();
        dispatch(insertItemToList({
          text,
          id: tempId,
          isSynchronized: false
        }));
        return dispatch(postItem(tempId, text));
      };

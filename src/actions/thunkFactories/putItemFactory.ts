import {
  AddItemErrorAction,
  PutItemSuccessAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import {
  putItemSuccess,
  saveItemText,
} from '../itemsActions';
import { IAppState } from '../../store/state/IAppState';
import {
  IItem,
  Item,
} from '../../models/Item';

export interface IPutItemDependencies {
  readonly putItemRequest: (item: IItem) => Promise<void>;
  readonly createItemError: (message: string, itemId: Guid, oldText: string) => AddItemErrorAction;
}

export const putItemFactory = (dependencies: IPutItemDependencies) =>
  (id: Guid, text: string, oldText?: string): Thunk =>
    async (dispatch: Dispatch, getState: () => IAppState): Promise<PutItemSuccessAction | AddItemErrorAction> => {
      oldText = oldText || getState().list.items.get(id).text;
      dispatch(saveItemText(id, text));

      try {
        await dependencies.putItemRequest(new Item({id, text}));

        return dispatch(putItemSuccess(id));

      } catch (error) {
        return dispatch(dependencies.createItemError(
          'There was an error while saving item: ' + error.message,
          id,
          oldText,
        ));
      }
    };

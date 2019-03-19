import {
  AddItemErrorAction,
  PostItemSuccessAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import {
  addItem,
  postItemSuccess,
} from '../itemsActions';
import { IItem } from '../../models/Item';

export interface IPostItemDependencies {
  readonly postItemRequest: (text: string) => Promise<IItem>;
  readonly generateId: () => Guid;
  readonly createItemError: (message: string, itemId: Guid) => AddItemErrorAction;
}

const handleItemPost = async (dependencies: IPostItemDependencies, dispatch: Dispatch, text: string, oldId: Guid): Promise<PostItemSuccessAction | AddItemErrorAction> => {
  try {
    const newItem = await dependencies.postItemRequest(text);

    return dispatch(postItemSuccess(oldId, newItem.id));

  } catch (error) {
    return dispatch(dependencies.createItemError(
      'There was an error while creating new item: ' + error.message,
      oldId,
    ));
  }
};

export const postItemFactory = (dependencies: IPostItemDependencies) =>
  (text: string): Thunk =>
    async (dispatch: Dispatch): Promise<PostItemSuccessAction | AddItemErrorAction> => {
      const tempId = dependencies.generateId();
      dispatch(addItem(tempId, text));

      return handleItemPost(dependencies, dispatch, text, tempId);
    };

export const repostItemFactory = (dependencies: IPostItemDependencies) =>
  (tempId: Guid, text: string): Thunk =>
    async (dispatch: Dispatch): Promise<PostItemSuccessAction | AddItemErrorAction> => {
      return handleItemPost(dependencies, dispatch, text, tempId);
    };


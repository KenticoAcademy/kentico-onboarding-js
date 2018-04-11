import { Dispatch } from 'react-redux';
import { IAction } from '../IAction';
import { ITEM_DELETION_FAILED, ITEM_INSERT_FAILED, ITEM_UPDATE_FAILED } from '../../constants/actionTypes';
import { deletionSucceeded } from './deleteItemFactory';
import { IIndexedItem } from '../../models/IndexedItem';
import { deleteFromServer, postItem, putItem } from '../index';

export const retry = (action: string, item: IIndexedItem) =>
  (dispatch: Dispatch<IAction>) => {
    switch (action) {
      case ITEM_INSERT_FAILED:
        dispatch(deletionSucceeded(item.id));
        return dispatch(postItem(item.text));

      case ITEM_UPDATE_FAILED:
        return dispatch(putItem({id: item.id, text: item.text}));

      case ITEM_DELETION_FAILED:
        return dispatch(deleteFromServer(item.id));

      default: return dispatch(postItem(item.text));
    }
  };

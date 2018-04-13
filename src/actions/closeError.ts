import { Dispatch } from 'react-redux';
import { ITEM_INSERT_FAILED, ITEM_UPDATE_FAILED } from '../constants/actionTypes';
import { deletionSucceeded } from './actionCreatorsFactories/deleteItemFactory';
import { closeItemError } from './actionCreators';
import { updateItem } from './actionCreatorsFactories/putItemFactory';
import { IIndexedItem } from '../models/IndexedItem';
import { IAppState } from '../models/IAppState';

export const closeError = (action: string, item: IIndexedItem) =>
  (dispatch: Dispatch<IAppState>, getState: () => IAppState) => {
    switch (action) {
      case ITEM_INSERT_FAILED:
        return dispatch(deletionSucceeded(item.id));

      case ITEM_UPDATE_FAILED:
        dispatch(updateItem({
          id: item.id,
          text: item.errorId
            ? getState().error.get(item.errorId).backupText
            : item.text,
          isSynchronized: true
        }));

        return dispatch(closeItemError(item.id, item.errorId || ''));

      default:
        return dispatch(closeItemError(item.id, item.errorId || ''));
    }
  };

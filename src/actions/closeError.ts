import { Dispatch } from 'react-redux';
import { ITEM_DELETION_FAILED, ITEM_INSERT_FAILED, ITEM_UPDATE_FAILED } from '../constants/actionTypes';
import { deletionSucceeded } from './actionCreatorsFactories/deleteItemFactory';
import { closeItemError } from './actionCreators';
import { updateItem } from './actionCreatorsFactories/putItemFactory';
import { IAppState } from '../models/IAppState';
import { IListItem } from '../models/ListItem';

export const closeError = (action: string, item: IListItem) =>
  (dispatch: Dispatch<IAppState>, getState: () => IAppState) => {
    switch (action) {
      case ITEM_INSERT_FAILED:
        return dispatch(deletionSucceeded(item.id));

      case ITEM_UPDATE_FAILED:
        dispatch(updateItem({
          id: item.id,
          text: item.errorId
            ? getState().error.get(item.errorId).item.text
            : item.text,
          isSynchronized: true
        }));

        return dispatch(closeItemError(item.id));

      case ITEM_DELETION_FAILED:
      default:
        return dispatch(closeItemError(item.id));
    }
  };

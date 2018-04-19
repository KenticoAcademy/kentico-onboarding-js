import { Dispatch } from 'react-redux';
import {
  ITEM_DELETION_FAILED,
  ITEM_INSERT_FAILED,
  ITEM_UPDATE_FAILED
} from '../../constants/actionTypes';
import { deletionSucceeded } from './deleteItemFactory';
import { IAppState } from '../../models/IAppState';
import { IListItem } from '../../models/ListItem';
import { IAction } from '../IAction';
import { IUpdateItem } from './putItemFactory';
import { Uuid } from '../../utils/generateId';

interface IRetryDependencies {
  postItem: (text: string) => (dispatch: Dispatch<IAppState>) => Promise<IAction>;
  putItem: (item: IUpdateItem) =>
    (dispatch: Dispatch<IAppState>, getState: () => IAppState) => Promise<IAction>;
  deleteFromServer: (id: Uuid) =>
    (dispatch: Dispatch<IAppState>, getState: () => IAppState) => Promise<IAction>;
}

export const retryFactory = ({postItem, putItem, deleteFromServer}: IRetryDependencies) =>
  (action: string, item: IListItem) =>
    (dispatch: Dispatch<IAppState>) => {
      switch (action) {
        case ITEM_INSERT_FAILED:
          dispatch(deletionSucceeded(item.id));

          return dispatch(postItem(item.text));

        case ITEM_UPDATE_FAILED:
          return dispatch(putItem({
            id: item.id,
            text: item.text,
            isSynchronized: true
          }));

        case ITEM_DELETION_FAILED:
          return dispatch(deleteFromServer(item.id));

        default:
          return dispatch(postItem(item.text));
      }
    };

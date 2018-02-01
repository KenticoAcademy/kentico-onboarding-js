import { postItem } from '../index';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';

export const optimisticAddFactory = (generateId: () => Uuid, insertItemToList: any) =>
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

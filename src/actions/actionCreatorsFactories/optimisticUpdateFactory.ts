import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { putItem } from '../index';

export const optimisticUpdateFactory = (updateItemInList: any) => (id: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
    dispatch(updateItemInList({
      id,
      text
    }));
    return dispatch(putItem(id, text));
  };

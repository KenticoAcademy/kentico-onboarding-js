import { deleteIt } from '../index';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';

export const optimisticDeleteFactory = (deleteItemFromList: any) => (id: Uuid) =>
  (dispatch: Dispatch<IAppState>): any => {
    dispatch(deleteItemFromList(id));
    return dispatch(deleteIt(id));
  };

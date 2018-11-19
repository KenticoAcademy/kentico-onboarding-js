import { Dispatch } from 'redux';
import { IItem } from '../../models/Item';
import { displayError, loadingItemsSuccess } from '../itemsActions';
import {
  DisplayErrorAction,
  LoadingItemsSuccessAction,
} from '../types/itemsActionTypes';

export interface IGetItemsDependencies {
  readonly getItemsRequest: () => Promise<ReadonlyArray<IItem>>;
}

export const getItemsFactory = (dependencies: IGetItemsDependencies) =>
  (): Thunk =>
    async (dispatch: Dispatch): Promise<LoadingItemsSuccessAction | DisplayErrorAction> => {
      try {
        const items = await dependencies.getItemsRequest();

        return dispatch(loadingItemsSuccess(items));

      } catch (error) {
        return dispatch(displayError('There was an error while loading items: ' + error.message));
      }
    };

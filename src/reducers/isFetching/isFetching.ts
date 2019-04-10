import { IListAction } from '../../actions/types/IListAction';
import { ITEMS_FETCH_SUCCEEDED, ITEMS_FETCH_STARTED } from '../../actions/types/listActionTypes';

export const isFetching = (state: boolean = false, action: IListAction): boolean => {
  switch (action.type) {
    case ITEMS_FETCH_SUCCEEDED:
      return false;

    case ITEMS_FETCH_STARTED:
      return true;

    default:
      return state;
  }
};

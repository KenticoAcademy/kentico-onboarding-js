import { IListAction } from '../../actions/types/IListAction';
import { ITEMS_FETCH_FAILED, ITEMS_FETCH_STARTED } from '../../actions/types/listActionTypes';

export const fetchingItemsFail = (state: boolean = false, action: IListAction): boolean => {
  switch (action.type) {
    case ITEMS_FETCH_FAILED:
      return true;

    case ITEMS_FETCH_STARTED:
      return false;

    default:
      return state;
  }
};

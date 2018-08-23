import * as ActionType from '../../actions/ActionTypes';
import { ListSorting } from '../../constants/ListSorting';
import { IAction } from '../../actions/IAction';

export const sorting = (state = ListSorting.CreatedTime, action: IAction): ListSorting => {
  switch (action.type) {
    case ActionType.SetListSorting:
      return action.payload.sorting;
    default:
      return state;
  }
};

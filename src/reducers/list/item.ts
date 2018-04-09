import { Item } from '../../models/Item';
import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../../@types/IAction';

export const item = (state = new Item(), action: IAction): Item => {
  switch (action.type) {
    case actionTypes.ITEM_SAVE_SUCCESS:
      return state.with({
        value: state.temporaryValue,
        isBeingEdited: false,
      });

    case actionTypes.ITEM_EDITING_START:
      return state.with({ isBeingEdited: true });

    case actionTypes.ITEM_EDITING_STOP:
      return state.with({
        temporaryValue: state.value,
        isBeingEdited: false,
      });

    case actionTypes.ITEM_VALUE_CHANGED:
      return state.with({ temporaryValue: action.payload.updatedValue });

    default:
      return state;
  }
};

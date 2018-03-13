import {
  ITEM_VALUE_CHANGED,
  ITEM_EDITING_STOP,
  ITEM_EDITING_START,
} from '../../utils/constants';

import { Item } from '../../models/item';

export const item = (state = Item(), action) => {
  switch (action.type) {
    case ITEM_EDITING_START:
      return state.merge({ isBeingEdited: true });

    case ITEM_EDITING_STOP:
      return state.merge({
        changeableValue: state.value,
        isBeingEdited: false,
      });

    case ITEM_VALUE_CHANGED:
      return state.merge({ changeableValue: action.updatedValue });

    default:
      return state;
  }
};

import {
  ITEM_VALUE_CHANGED,
  ITEM_EDITING_STOP,
  ITEM_EDITING_START,
} from '../../utils/constants';

export const item = (state, action) => {
  switch (action.type) {

    case ITEM_EDITING_START:
      return state.mergeIn([action.itemKey], { isBeingEdited: true });

    case ITEM_EDITING_STOP:
      return stopEditing(state, action.itemKey);

    case ITEM_VALUE_CHANGED:
      return state.mergeIn([action.itemKey], { changeableValue: action.updatedValue });

    default:
      return state;
  }
};

const stopEditing = (state, key) => {
  const currentItem = state.get(key);

  return state.mergeIn([key], {
    changeableValue: currentItem.value,
    isBeingEdited: false,
  });
};

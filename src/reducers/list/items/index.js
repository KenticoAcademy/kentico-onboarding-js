import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/ListItem';

import {
  ITEM_CREATED,
  ITEM_OPENED_FOR_EDITING,
  ITEM_DELETED,
  ITEM_CHANGES_CANCELED,
  ITEM_CHANGES_SAVED,
} from '../../../actionTypes';
import { createNewId } from '../../../utils/createNewId';

const addNewItem = (state, action) => {
  const { itemId: id, text } = action;

  const newItem = new ListItem({
    id,
    text,
  });

  return state.set(id, newItem);
};

const deleteItem = (state, action) => {
  const { itemId } = action;

  return state.delete(itemId);
};

const saveItemChanges = (state, action) => {
  const { itemId, newText } = action;

  return state.update(itemId, item => item.merge({
    text: newText,
    isBeingEdited: false,
  }));
};

const openItemForEditing = (state, action) => {
  const {
    itemId,
  } = action;

  return state.update(itemId, item =>
    item.merge({
      isBeingEdited: true,
    }));
};

const cancelItemChanges = (state, action) => {
  const { itemId } = action;

  return state.update(itemId, item =>
    item.merge({
      isBeingEdited: false,
    }));
};

const itemId1 = createNewId();
const itemId2 = createNewId();
const itemId3 = createNewId();

const initialState = OrderedMap(
  {
    [itemId1]: new ListItem({
      id: itemId1,
      text: 'text',
    }),
    [itemId2]: new ListItem({
      id: itemId2,
      text: 'text2',
    }),
    [itemId3]: new ListItem({
      id: itemId3,
      text: 'text3',
    }),
  },
);

export const itemsReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ITEM_CREATED:
      return addNewItem(state, action);
    case ITEM_DELETED:
      return deleteItem(state, action);
    case ITEM_CHANGES_SAVED:
      return saveItemChanges(state, action);
    case ITEM_OPENED_FOR_EDITING:
      return openItemForEditing(state, action);
    case ITEM_CHANGES_CANCELED:
      return cancelItemChanges(state, action);
    default:
      return state;
  }
};

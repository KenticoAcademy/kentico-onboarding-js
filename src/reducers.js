import { OrderedMap, Record } from 'immutable';
import { createNewId } from './utils/createNewId';
import {
  ITEM_CREATED,
  ITEM_CLICKED,
  ITEM_DELETED,
  ITEM_CHANGE_CANCELED,
  ITEM_CHANGE_SAVED,
} from './actionTypes';

const ListItemRecord = Record({ id: '', text: '' });

function addNewItem(
  state = { items: OrderedMap() },
  action
) {
  const id = createNewId();
  const item = new ListItemRecord({ id, text: action.newText });
  const newItems = state.items.set(id, item);

  return { items: newItems };
}

function deleteItem(
  state = { items: OrderedMap() },
  action
) {
  const { itemId } = action;
  const item = state.items.get(itemId);

  if (item !== undefined) {
    const newItems = state.items.delete(itemId);
    return { ...state, items: newItems };
  }

  return { ...state };
}

function changeItemText(
  state = { items: OrderedMap() },
  action
) {
  const { itemId, newText } = action;
  const newItems = state.items.map((item, id) => {
    if (id === itemId) {
      return item.set('text', newText);
    }
    return item;
  });

  this.setState({ items: newItems });
}

function itemClicked() {
  return { isBeingEdited: true };
}

function cancelChanges() {
  return { isBeingEdited: false };
}

export function reducers(state, action) {
  const { type } = action;

  switch (type) {
    case ITEM_CREATED:
      return addNewItem(state, action);
    case ITEM_CLICKED:
      return itemClicked(state, action);
    case ITEM_DELETED:
      return deleteItem(state, action);
    case ITEM_CHANGE_CANCELED:
      return cancelChanges(state, action);
    case ITEM_CHANGE_SAVED:
      return changeItemText(state, action);
    default:
      return state;
  }
}

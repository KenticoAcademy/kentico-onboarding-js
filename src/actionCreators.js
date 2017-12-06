import {
  ITEM_CHANGES_SAVED,
  ITEM_CHANGES_CANCELED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_OPENED_FOR_EDITING,
} from './actionTypes';

export function addNewItem({ itemId, text }) {
  return {
    type: ITEM_CREATED,
    itemId,
    text,
  };
}

export function openItemForEditing({ itemId }) {
  return {
    type: ITEM_OPENED_FOR_EDITING,
    itemId,
  };
}

export function deleteItem({ itemId }) {
  return {
    type: ITEM_DELETED,
    itemId,
  };
}

export function saveItemChanges({ itemId, newText }) {
  return {
    type: ITEM_CHANGES_SAVED,
    itemId,
    newText,
  };
}

export function cancelItemChanges({ itemId }) {
  return {
    type: ITEM_CHANGES_CANCELED,
    itemId,
  };
}

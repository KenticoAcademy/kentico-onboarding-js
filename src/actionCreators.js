import {
  ITEM_CHANGE_CANCELED,
  ITEM_CHANGE_SAVED,
  ITEM_CLICKED,
  ITEM_CREATED,
  ITEM_DELETED,
} from './actionTypes';

export function createItem({ itemId, text }) {
  return {
    type: ITEM_CREATED,
    itemId,
    text,
  };
}

export function clickItem(itemId) {
  return {
    type: ITEM_CLICKED,
    itemId,
  };
}

export function deleteItem(itemId) {
  return {
    type: ITEM_DELETED,
    itemId,
  };
}

export function changeItem({ itemId, newText }) {
  return {
    type: ITEM_CHANGE_SAVED,
    itemId,
    newText,
  };
}

export function cancelItemChange(itemId) {
  return {
    type: ITEM_CHANGE_CANCELED,
    itemId,
  };
}

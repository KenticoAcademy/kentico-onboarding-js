import {
  ITEM_CHANGE_SAVED,
  ITEM_CHANGES_CANCELED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_TEXT_SELECTED,
} from './actionTypes';

export function addNewItem({ itemId, text }) {
  return {
    type: ITEM_CREATED,
    itemId,
    text,
  };
}

export function selectItemText({ itemId, selectionRangeStarts, selectionRangeEnds }) {
  return {
    type: ITEM_TEXT_SELECTED,
    itemId,
    selectionRangeStarts,
    selectionRangeEnds,
  };
}

export function deleteItem({ itemId }) {
  return {
    type: ITEM_DELETED,
    itemId,
  };
}

export function changeItemText({ itemId, newText }) {
  return {
    type: ITEM_CHANGE_SAVED,
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

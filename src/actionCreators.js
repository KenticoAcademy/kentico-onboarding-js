import {
  ITEM_CHANGES_SAVED,
  ITEM_CHANGES_CANCELED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_OPENED_FOR_EDITING,
} from './actionTypes';

export const addNewItem = ({ text, createNewId }) => {
  const itemId = createNewId();

  return {
    type: ITEM_CREATED,
    itemId,
    text,
  };
};

export const openItemForEditing = ({ itemId }) => {
  return {
    type: ITEM_OPENED_FOR_EDITING,
    itemId,
  };
};

export const deleteItem = ({ itemId }) => {
  return {
    type: ITEM_DELETED,
    itemId,
  };
};

export const saveItemChanges = ({ itemId, newText }) => {
  return {
    type: ITEM_CHANGES_SAVED,
    itemId,
    newText,
  };
};

export const cancelItemChanges = ({ itemId }) => {
  return {
    type: ITEM_CHANGES_CANCELED,
    itemId,
  };
};

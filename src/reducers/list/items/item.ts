import { ListItem } from '../../../models/classes/ListItem';

export const updateItemReducer = (item: ListItem, updatedItem: ListItem): ListItem =>
  item.with({
    text: updatedItem.text,
    isBeingEdited: false,
  });

export const toggleItemReducer = (item: ListItem): ListItem =>
  item.with({
    isBeingEdited: !item.isBeingEdited,
  });

export const closeItemReducer = (item: ListItem): ListItem =>
  item.with({
    isBeingEdited: false,
  });

export const setSyncedTextReducer = (item: ListItem): ListItem =>
  item.with({
    syncedText: item.text,
  });

export const revertUpdateReducer = (item: ListItem): ListItem =>
  item.with({
    text: item.syncedText,
  });

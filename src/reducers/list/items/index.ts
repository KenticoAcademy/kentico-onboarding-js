import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/classes/ListItem';
import { ItemsState } from '../../../models/state/ItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import { Uuid } from '../../../models/Uuid';
import { arrayToOrderedMap } from '../../../utils/arrayToOrderedMap';
import { IListItem } from '../../../models/interfaces/IListItem';
import { IFetchedItem } from '../../../models/interfaces/IFetchedItem';
import { item } from './item';
import {
  ITEM_ADD_REVERT,
  ITEM_ADD_START,
  ITEM_ADD_SUCCESS,
  ITEM_DELETE_START,
  ITEM_DELETE_SUCCESS,
  ITEM_TOGGLE,
  ITEM_UPDATE_REVERT,
  ITEM_UPDATE_START,
  ITEM_UPDATE_SUCCESS,
  ITEMS_FETCH_SUCCESS,
  UNSAVED_ITEM_DELETE,
} from '../../../constants/actionTypes';

const initialState = OrderedMap<Uuid, ListItem>();

export const items = (state = initialState, action: IAction): ItemsState => {
  const { payload } = action;

  switch (action.type) {
    case ITEM_ADD_START: {
      const newItem = new ListItem({ ...payload });

      return state.set(newItem.id, newItem);
    }
    case ITEM_ADD_SUCCESS: {
      const { updatedItem, oldId } = payload;

      return state
        .set(
          updatedItem.id,
          new ListItem({
            ...updatedItem,
            syncedText: updatedItem.text,
          }),
        )
        .delete(oldId);
    }
    case ITEM_DELETE_SUCCESS:
    case UNSAVED_ITEM_DELETE:
    case ITEM_ADD_REVERT: {
      return state.delete(payload.id);
    }
    case ITEM_UPDATE_START: {
      return state.update(payload.item.id, originalItem => item(originalItem, action));
    }
    case ITEM_TOGGLE:
    case ITEM_DELETE_START:
    case ITEM_UPDATE_SUCCESS:
    case ITEM_UPDATE_REVERT: {
      return state.update(payload.id, originalItem => item(originalItem, action));
    }
    case ITEMS_FETCH_SUCCESS: {
      const returnedItems: IListItem[] = action.payload.items.map((item: IFetchedItem) => ({
        ...item,
        syncedText: item.text,
      }));

      return arrayToOrderedMap(
        returnedItems,
        ListItem,
      );
    }
    default:
      return state;
  }
};

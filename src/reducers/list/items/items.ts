import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/classes/ListItem';
import * as ActionTypes from '../../../constants/actionTypes';
import { IItemsState } from '../../../models/interfaces/IItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import { Guid } from '../../../models/Guid';
import { listItemsArrayToOrderedMap } from '../../../utils/listItemsArrayToOrderedMap';

const addNewItem = (state: IItemsState, { payload: { itemId: id, text } }: IAction): IItemsState => {
  const newItem = new ListItem({
    id,
    text,
  });

  return state.set(id, newItem);
};

const deleteItem = (state: IItemsState, { payload: { itemId } }: IAction): IItemsState =>
  state.delete(itemId);

const saveItemChanges = (state: IItemsState, { payload: { itemId, newText: text } }: IAction): IItemsState =>
  state.update(itemId, item =>
    item.with({
      text,
      isBeingEdited: false,
    }));

const changeItemOpenState = (state: IItemsState, { payload: { itemId } }: IAction): IItemsState =>
  state.update(itemId, item =>
    item.with({
      isBeingEdited: !item.isBeingEdited,
    }));

const fetchItems = (action: IAction): IItemsState =>
  listItemsArrayToOrderedMap(action.payload.items);

const initialState = OrderedMap<Guid, ListItem>();

export const items = (state = initialState, action: IAction): IItemsState => {
  const { type } = action;

  switch (type) {
    case ActionTypes.ITEM_CREATED:
      return addNewItem(state, action);
    case ActionTypes.ITEM_DELETED:
      return deleteItem(state, action);
    case ActionTypes.ITEM_CHANGES_SAVED:
      return saveItemChanges(state, action);
    case ActionTypes.ITEM_OPEN_STATE_CHANGED:
      return changeItemOpenState(state, action);
    case ActionTypes.FETCH_ITEMS_SUCCESS:
      return fetchItems(action);
    default:
      return state;
  }
};

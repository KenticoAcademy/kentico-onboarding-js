import { List, OrderedMap } from "immutable";

import { items } from './items';
import { toggleEdited } from '../../actions/baseActions';
import { ListItem } from '../../models/ListItem';
import { TodoListAction } from '../../actions/types/TodoListAction';
import {
  ListItem_Delete_Error,
  ListItem_GetAll_Response,
  ListItem_Post_Error,
  ListItem_Post_Response,
  ListItem_Put_Error,
  ListItem_Put_Response
} from '../../constants/todoActionTypes';
import { addNewItem } from '../../actions/thunkActionCreators/postItemActionCreator';
import {
  removeItem,
  removeItemSucceeded
} from '../../actions/thunkActionCreators/deleteItemActionCreator';
import { editItem } from '../../actions/thunkActionCreators/putItemActionCreator';

describe('Items reducer ', () => {
  const makeCoffeeItem = new ListItem({
    text: 'Make coffee',
    id: '5',
    isEdited: false,
    isFetching: false,
  });

  const sleepItem = new ListItem({
    text: 'Sleep',
    id: '13',
    isEdited: false,
    isFetching: false,
  });

  const initialValues = [
    [makeCoffeeItem.id, makeCoffeeItem],
    [sleepItem.id, sleepItem]
  ];

  const originalState = OrderedMap<Guid, ListItem>(initialValues);

  it('returns previous state when action is unknown', () => {
    const invalidAction: TodoListAction = {type: 'INVALID ACTION', payload: ''};
    const expectedState = originalState;

    const newState = items(originalState, invalidAction);

    expect(expectedState).toEqual(newState);
  });

  it('toggles property isEdited correctly (ListItem_ToggleEdited action)', () => {
    const itemToToggle = new ListItem(originalState.first());
    const togglingAction: TodoListAction = toggleEdited(itemToToggle.id);
    const toggledItem: ListItem = itemToToggle.with({ isEdited: !itemToToggle.isEdited });
    const expectedState: ListValues = originalState.update(itemToToggle.id, () => toggledItem);

    const newState: ListValues = items(originalState, togglingAction);

    expect(newState.size).toEqual(originalState.size);
    expect(newState).toEqual(expectedState);
  });

  it('adds new item correctly (ListItem_Post_Request action)', () => {
    const text = 'something';
    const addingAction = addNewItem(text, '14');
    const newItem = new ListItem({
      id: '14',
      text,
      isEdited: false,
      isFetching: true,
    });
    const expectedItems = originalState.set(newItem.id, newItem);

    const newItems = items(originalState, addingAction);

    expect(newItems).toEqual(expectedItems);
  });

  it('returns an Ordered Map made of all items included in action (ListItem_GetAll_Response action)', () => {
    const action: TodoListAction = {
      type: ListItem_GetAll_Response,
      payload: {
        items: List<ListItem>([sleepItem, makeCoffeeItem])
      }
    };
    const prevState = OrderedMap<Guid, ListItem>();
    const expectedState = OrderedMap<Guid, ListItem>([[sleepItem.id, sleepItem], [makeCoffeeItem.id, makeCoffeeItem]]);

    const newState = items(prevState, action);

    expect(newState).toEqual(expectedState);
  });

  it('add loading item to list - optimistic update (ListItem_Post_Error, ListItem_Put_Error, ListItem_Delete_Error action)', () => {
    const actionTypes = [ListItem_Post_Error, ListItem_Delete_Error, ListItem_Put_Error];
    for (const actionType in actionTypes) {
      const itemId = '2042';
      const itemToAdd = new ListItem({
        id: itemId,
        text: 'hippo',
        isEdited: false,
        isFetching: false,
      });
      const action: TodoListAction = {
        type: actionType,
        payload: {
          id: itemId,
          failedAction: {},
        }
      };
      const prevState = OrderedMap<Guid, ListItem>([[itemId, itemToAdd]]);
      const editedItem = new ListItem({
        isFetching: false,
        isEdited: false,
        id: itemId,
        text: itemToAdd.text
      });
      const expectedState = prevState.set(itemId, editedItem);

      const newState = items(prevState, action);

      expect(newState).toEqual(expectedState);
    }
  });

  it('successful POST adds item to list - item is not loading anymore (ListItem_Post_Response action)', () => {
    const oldItemId = '1000';
    const newItemId = '2000';
    const fetchedItem = new ListItem({
      id: newItemId,
      text: 'hippopotamus',
      isFetching: true,
      isEdited: false,
    });
    const action: TodoListAction = {
      type: ListItem_Post_Response,
      payload: {
        previousId: oldItemId,
        item: fetchedItem
      },
    };
    const updatedItem = new ListItem({
      id: newItemId,
      text: fetchedItem.text,
      isEdited: fetchedItem.isEdited,
      isFetching: fetchedItem.isFetching,
    });
    const prevState = OrderedMap<Guid, ListItem>([[fetchedItem.id, fetchedItem]]);
    const expectedState = prevState.set(updatedItem.id, updatedItem);

    const newState = items(prevState, action);

    expect(newState).toEqual(expectedState);
  });

  it('keeps items the same because of optimistic update, changes only loading state' +
    '(ListItem_Delete_Request action)', () => {
    const itemToDelete = new ListItem(originalState.first());
    const itemWithEditedFetching = itemToDelete.with({isFetching: true});
    const deletingAction = removeItem(itemToDelete.id);
    const expectedState = originalState.update(itemToDelete.id, () => itemWithEditedFetching);

    const newState = items(originalState, deletingAction);

    expect(newState).toEqual(expectedState);
  });

  it('removes item correctly (ListItem_Delete_Response action)', () => {
    const itemToDelete = new ListItem(originalState.first());
    const deletingAction = removeItemSucceeded(itemToDelete.id);
    const expectedState = originalState.delete(itemToDelete.id);

    const newState = items(originalState, deletingAction);

    expect(newState).toEqual(expectedState);
  });

  it('edits item correctly (ListItem_Put_Request action)', () => {
    const itemToEdit = new ListItem(originalState.first());
    const newText = 'newText';
    const editingAction: TodoListAction = editItem(itemToEdit.id, newText);
    const editedItem: ListItem = itemToEdit.with({
      isEdited: false,
      text: newText,
      isFetching: true
    });
    const expectedState: ListValues = originalState.update(itemToEdit.id, () => editedItem);

    const newState: ListValues = items(originalState, editingAction);

    expect(newState.size).toEqual(expectedState.size);
    expect(newState).toEqual(expectedState);
  });

  it('cancels loading of item (ListItem_Put_Response action)', () => {
    const itemId = '5';
    const editedItem = new ListItem({
      id: itemId,
      text: 'happy',
      isEdited: false,
      isFetching: true,
    });
    const action: TodoListAction = {
      type: ListItem_Put_Response,
      payload: {
        id: itemId
      }
    };
    const changedPropItem = new ListItem({
      id: itemId,
      text: editedItem.text,
      isEdited: false,
      isFetching: false,
    });
    const prevState = OrderedMap<Guid, ListItem>([[editedItem.id, editedItem]]);
    const expectedState = prevState.set(itemId, changedPropItem);

    const newState = items(prevState, action);

    expect(newState).toEqual(expectedState);
  });
});

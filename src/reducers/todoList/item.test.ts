import { ListItem } from '../../models/ListItem';
import { generateGuid } from '../../utils/generateId';
import {
  toggleEdited
} from '../../actions/baseActions';
import { item } from './item';
import { TodoListAction } from '../../actions/types/TodoListAction';
import {
  ListItem_Delete_Error,
  ListItem_Delete_Request,
  ListItem_Post_Error,
  ListItem_Post_Response
} from '../../constants/todoActionTypes';
import { editItem } from '../../actions/thunkActionCreators/putItemActionCreator';

describe('ListItem reducer ', () => {
  it('toggles property isEdited correctly (ListItem_ToggleEdited action)', () => {
    const itemToEdit = new ListItem({
      text: 'text',
      id: generateGuid(),
      isEdited: false,
      isFetching: false,
    });
    const expectedItem: ListItem = itemToEdit.with({isEdited: !itemToEdit.isEdited});
    const action: TodoListAction = toggleEdited(itemToEdit.id);

    const editedItem: ListItem = item(itemToEdit, action);

    expect(editedItem).toEqual(expectedItem);
  });

  it('saves item correctly (SAVE_ITEM action)', () => {
    const itemToEdit: ListItem = new ListItem({
      text: 'text',
      id: generateGuid(),
      isEdited: false,
      isFetching: false,
    });
    const newText = 'newText';
    const expectedItem: ListItem = itemToEdit.with({
      text: newText,
      isEdited: false,
      isFetching: true,
    });
    const action: TodoListAction= editItem(itemToEdit.id, newText);

    const editedItem: ListItem = item(itemToEdit, action);

    expect(editedItem).toEqual(expectedItem);
  });

  it('returns default state in case invalid action is given as a param', () => {
    const invalidAction: TodoListAction = {type: 'INVALID ACTION', payload: ''};
    const defaultState = new ListItem();

    const newState: ListItem = item(undefined, invalidAction);

    expect(newState).toEqual(defaultState);
  });

  it('returns previous state when action is unknown', () => {
    const invalidAction: TodoListAction = {type: 'INVALID ACTION', payload: ''};
    const expectedState = new ListItem({
      text: 'text',
      id: generateGuid(),
      isEdited: false,
      isFetching: false,
    });

    const newState: ListItem = item(expectedState, invalidAction);

    expect(expectedState).toEqual(newState);
  });

  it('toggles property isFetching correctly - optimistic update (ListItem_Post_Response action)', () => {
    const id = '23';
    const action: TodoListAction = {
      type: ListItem_Post_Response,
      payload: {},
    };
    const addedItem = new ListItem({
      id,
      text: 'text',
      isFetching: true,
      isEdited: false,
    });
    const expectedResult = new ListItem({
      id,
      text: 'text',
      isEdited: false,
      isFetching: false,
    });

    const newState = item(addedItem, action);

    expect(newState).toEqual(expectedResult);
  });

  it('toggles property isFetching correctly - optimistic update (ListItem_Post_Error action)', () => {
    const id = '23';
    const action: TodoListAction = {
      type: ListItem_Post_Error,
      payload: {},
    };
    const newItem = new ListItem({
      id,
      text: 'text',
      isFetching: true,
      isEdited: false,
    });
    const expectedResult = new ListItem({
      id,
      text: 'text',
      isEdited: false,
      isFetching: false,
    });

    const newState = item(newItem, action);

    expect(newState).toEqual(expectedResult);
  });

  it('toggles property isFetching and isEdited correctly - optimistic update (ListItem_Delete_Request action)', () => {
    const id = '23';
    const action: TodoListAction = {
      type: ListItem_Delete_Request,
      payload: {
        id
      },
    };
    const itemToDelete = new ListItem({
      id,
      text: 'text',
      isFetching: false,
      isEdited: true,
    });
    const expectedResult = new ListItem({
      id,
      text: 'text',
      isFetching: true,
      isEdited: false,
    });

    const newState = item(itemToDelete, action);

    expect(newState).toEqual(expectedResult);
  });

  it('toggles property isFetching correctly - optimistic update (ListItem_Delete_Error action)', () => {
    const id = '23';
    const action: TodoListAction = {
      type: ListItem_Delete_Error,
      payload: {},
    };
    const itemToDelete = new ListItem({
      id,
      text: 'text',
      isFetching: true,
      isEdited: false,
    });
    const expectedResult = new ListItem({
      id,
      text: 'text',
      isEdited: false,
      isFetching: false,
    });

    const newState = item(itemToDelete, action);

    expect(newState).toEqual(expectedResult);
  });
});

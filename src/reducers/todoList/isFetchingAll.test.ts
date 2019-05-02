import { isFetchingAll } from './isFetchingAll';
import {
  ListItem_GetAll_Error,
  ListItem_GetAll_Request,
  ListItem_GetAll_Response,
  ListItem_ToggleEdited,
  ListItem_Post_Request,
  ListItem_Delete_Request,
  ListItem_Put_Request
} from '../../constants/todoActionTypes';
import { TodoListAction } from '../../actions/types/TodoListAction';


describe('IsFetchingAll reducer ', () => {
  it('sets state property isFetchingAll to true correctly (ListItem_GetAll_Request action)', () => {
    const initialState = false;
    const action: TodoListAction = {
      type: ListItem_GetAll_Request,
      payload: {},
    };
    const expectedState = true;
    const newState = isFetchingAll(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('sets state property isFetchingAll to false correctly (ListItem_Delete_Request action)', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: ListItem_Delete_Request,
      payload: {},
    };
    const expectedState = false;
    const newState = isFetchingAll(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('sets state property isFetchingAll to false correctly (ListItem_ToggleEdited action)', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: ListItem_ToggleEdited,
      payload: {},
    };
    const expectedState = false;
    const newState = isFetchingAll(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('sets state property isFetchingAll to false correctly (ListItem_GetAll_Response action)', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: ListItem_GetAll_Response,
      payload: {},
    };
    const expectedState = false;
    const newState = isFetchingAll(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('sets state property isFetchingAll to false correctly (ListItem_GetAll_Error action)', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: ListItem_GetAll_Error,
      payload: {},
    };
    const expectedState = false;
    const newState = isFetchingAll(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('returns default state when unknown action is defined', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: 'unknown_type',
      payload: {},
    };
    const expectedState = true;
    const newState = isFetchingAll(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('sets state property isFetchingAll to false correctly (ListItem_Post_Request action)', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: ListItem_Post_Request,
      payload: {},
    };
    const expectedState = false;
    const newState = isFetchingAll(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('sets state property isFetchingAll to false correctly (ListItem_Put_Request action)', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: ListItem_Put_Request,
      payload: {},
    };
    const expectedState = false;
    const newState = isFetchingAll(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});

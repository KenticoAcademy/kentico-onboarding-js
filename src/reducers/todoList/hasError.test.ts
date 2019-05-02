import {
  ListItem_GetAll_Error,
  ListItem_GetAll_Response
} from '../../constants/todoActionTypes';
import { hasError } from './hasError';
import { TodoListAction } from '../../actions/types/TodoListAction';

describe('hasError reducer ', () => {
  it('sets state property hasError to true correctly (ListItem_GetAll_Error action)', () => {
    const initialState = false;
    const action: TodoListAction = {
      type: ListItem_GetAll_Error,
      payload: {}
    };
    const expectedResult = true;

    const newState = hasError(initialState, action);

    expect(newState).toEqual(expectedResult);
  });

  it('sets state property hasError to false correctly (ListItem_GetAll_Response action)', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: ListItem_GetAll_Response,
      payload: {}
    };
    const expectedResult = false;

    const newState = hasError(initialState, action);

    expect(newState).toEqual(expectedResult);
  });

  it('returns default state when unknown action type is specified', () => {
    const initialState = true;
    const action: TodoListAction = {
      type: 'unknown_action',
      payload: {}
    };
    const expectedResult = true;

    const newState = hasError(initialState, action);

    expect(newState).toEqual(expectedResult);
  });
});

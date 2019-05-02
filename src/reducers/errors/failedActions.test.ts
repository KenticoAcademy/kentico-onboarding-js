import { TodoListAction } from '../../actions/types/TodoListAction';
import { OrderedMap } from 'immutable';
import { failedActions } from './failedActions';
import {
  ListItem_Post_Error,
  ListItem_Post_Response,
} from '../../constants/todoActionTypes';


describe('FailedActions reducer ', () => {
  it('returns previous state when action is unknown', () => {
    const unknownAction: TodoListAction = {
      type: 'UNKNOWN',
      payload: {},
    };
    const state = OrderedMap<Guid, TodoListAction>();

    const newState = failedActions(state, unknownAction);

    expect(newState).toEqual(state);
  });

  it('deletes a failed action if ListItem_Post_Response action is received', () => {
    const itemId = '1995';
    const action: TodoListAction = {
      type: ListItem_Post_Response,
      payload: {
        id: itemId
      }
    };
    const prevState = OrderedMap<Guid, TodoListAction>([[itemId, action]]);
    const expectedState = prevState.delete(itemId);

    const newState = failedActions(prevState, action);

    expect(newState).toEqual(expectedState);
  });

  it('adds new failed action to ordered map in case of ListItem_Post_Error action', () => {
    const itemId = '2020';
    const failedAction: TodoListAction = {
      type: ListItem_Post_Response,
      payload: {},
    };
    const action: TodoListAction = {
      type: ListItem_Post_Error,
      payload: {
        id: itemId,
        failedAction,
      }
    };
    const prevState = OrderedMap<Guid, TodoListAction>();
    const expectedState = prevState.set(itemId, failedAction);

    const newState = failedActions(prevState, action);

    expect(newState).toEqual(expectedState);
  });
});

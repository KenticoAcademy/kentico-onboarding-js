import { IListItem } from '../../../src/models/interfaces/IListItem';
import { ListItem } from '../../../src/models/classes/ListItem';
import { postItemFactory } from '../../../src/actions/thunk/postItemFactory';
import {
  assertThatDispatchWasCalledWithActions,
  configurationObjectBase,
  dispatchFactory,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
} from './utils/utils';

describe('postItem will call dispatch with', () => {
  it('notify success and add new item actions', () => {
    const expectedActions = [
      'notifySuccess',
      'addNewItem',
    ];
    const uri = '';
    const text = '';
    const createdItem: IListItem = new ListItem({});
    const fetch = fetchReturnsOkResponseFactory(createdItem);
    const notifySuccess = jest.fn(() => expectedActions[0]);
    const addNewItem = jest.fn(() => expectedActions[1]);
    const postItem = postItemFactory({
      ...configurationObjectBase,
      fetch,
      notifySuccess,
      addNewItem
    });
    const dispatch = dispatchFactory();

    const dispatchablePostItem = postItem(uri, text);

    return assertThatDispatchWasCalledWithActions(dispatchablePostItem, dispatch, expectedActions);
  });

  it('notify error action', () => {
    const expectedActions = [
      'notifyError',
    ];
    const uri = '';
    const text = '';
    const fetch = fetchAlwaysFailFactory();
    const notifyError = jest.fn(() => expectedActions[0]);
    const postItem = postItemFactory({
      ...configurationObjectBase,
      fetch,
      notifyError,
      addNewItem: fakeFunction,
      notifySuccess: fakeFunction,
    });
    const dispatch = dispatchFactory();

    const dispatchablePostItem = postItem(uri, text);

    return assertThatDispatchWasCalledWithActions(dispatchablePostItem, dispatch, expectedActions);
  });
});

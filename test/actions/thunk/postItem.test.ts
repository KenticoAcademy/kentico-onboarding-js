import { IListItem } from '../../../src/models/interfaces/IListItem';
import { ListItem } from '../../../src/models/classes/ListItem';
import { postItemFactory } from '../../../src/actions/thunk/postItemFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  fakeHandleErrors as handleErrors,
} from './utils/utils';

const actionParams = {
  uri: '',
  text: '',
};

describe('postItem will call dispatch with', () => {
  it('notify success and add new item actions', () => {
    const expectedActions = [
      'notifySuccess',
      'addNewItem',
    ];
    const createdItem: IListItem = new ListItem({});
    const fetch = fetchReturnsOkResponseFactory(createdItem);
    const notifySuccess = jest.fn(() => expectedActions[0]);
    const addNewItem = jest.fn(() => expectedActions[1]);
    const postItem = postItemFactory({
      fetch,
      notifySuccess,
      addNewItem,
      handleErrors,
      notifyError: fakeFunction,
      registerAction: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('notify error action', () => {
    const expectedActions = [
      'registerAction',
      'notifyError',
    ];
    const fetch = fetchAlwaysFailFactory();
    const registerAction = jest.fn(() => expectedActions[0]);
    const notifyError = jest.fn(() => expectedActions[1]);
    const postItem = postItemFactory({
      fetch,
      notifyError,
      handleErrors,
      registerAction,
      addNewItem: fakeFunction,
      notifySuccess: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});

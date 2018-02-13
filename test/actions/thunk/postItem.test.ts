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
  it('add new item action', () => {
    const expectedActions = [
      'addNewItem',
    ];
    const createdItem: IListItem = new ListItem({});
    const fetch = fetchReturnsOkResponseFactory(createdItem);
    const addNewItem = jest.fn(() => expectedActions[0]);
    const postItem = postItemFactory({
      fetch,
      addNewItem,
      handleErrors,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('no action', () => {
    const expectedActions: string[] = [
    ];
    const fetch = fetchAlwaysFailFactory();
    const postItem = postItemFactory({
      fetch,
      handleErrors,
      addNewItem: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});

import { IListItem } from '../../../src/models/interfaces/IListItem';
import { ListItem } from '../../../src/models/classes/ListItem';
import { postItemFactory } from '../../../src/actions/thunk/postItemFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  httpClientFailure,
  httpClientSuccessFactory,
} from './utils/utils';

const actionParams = {
  uri: '',
  text: '',
};

describe('postItem will call dispatch with', () => {
  it('add new item and confirm added item actions', () => {
    const expectedActions = [
      'addNewItem',
      'confirmAddedItem',
    ];
    const createdItem: IListItem = new ListItem({});
    const httpClient = httpClientSuccessFactory(createdItem);
    const addNewItem = jest.fn(() => expectedActions[0]);
    const confirmAddedItem = jest.fn(() => expectedActions[1]);
    const postItem = postItemFactory({
      httpClient,
      addNewItem,
      confirmAddedItem,
      createNewId: fakeFunction,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('add new item and item sync failed actions', () => {
    const expectedActions = [
      'addNewItem',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const addNewItem = jest.fn(() => expectedActions[0]);
    const itemSyncFailed = jest.fn(() => expectedActions[1]);
    const postItem = postItemFactory({
      httpClient,
      addNewItem,
      itemSyncFailed,
      confirmAddedItem: fakeFunction,
      createNewId: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});

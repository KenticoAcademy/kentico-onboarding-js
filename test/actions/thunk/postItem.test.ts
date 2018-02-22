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
  text: '',
};
const uri = '';

describe('postItem will call dispatch with', () => {
  it('addNewItem, itemSyncRequested and confirmAddedItem actions', () => {
    const expectedActions = [
      'addNewItem',
      'itemSyncRequested',
      'confirmAddedItem',
    ];
    const createdItem: IListItem = new ListItem({});
    const httpClient = httpClientSuccessFactory(createdItem);
    const addNewItem = jest.fn(() => expectedActions[0]);
    const itemSyncRequested = jest.fn(() => expectedActions[1]);
    const confirmAddedItem = jest.fn(() => expectedActions[2]);
    const postItem = postItemFactory({
      uri,
      httpClient,
      addNewItem,
      confirmAddedItem,
      itemSyncRequested,
      createNewId: fakeFunction,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('addNewItem, itemSyncRequested and itemSyncFailed actions', () => {
    const expectedActions = [
      'addNewItem',
      'itemSyncRequested',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const addNewItem = jest.fn(() => expectedActions[0]);
    const itemSyncRequested = jest.fn(() => expectedActions[1]);
    const itemSyncFailed = jest.fn(() => expectedActions[2]);
    const postItem = postItemFactory({
      uri,
      httpClient,
      addNewItem,
      itemSyncFailed,
      itemSyncRequested,
      confirmAddedItem: fakeFunction,
      createNewId: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});

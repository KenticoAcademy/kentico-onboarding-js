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
  it('addNewItemRequest and addNewItemConfirm actions', () => {
    const expectedActions = [
      'addNewItemRequest',
      'addNewItemConfirm',
    ];
    const createdItem: IListItem = new ListItem({});
    const httpClient = httpClientSuccessFactory(createdItem);
    const addNewItemRequest = jest.fn(() => expectedActions[0]);
    const addNewItemConfirm = jest.fn(() => expectedActions[1]);
    const postItem = postItemFactory({
      uri,
      httpClient,
      addNewItemRequest,
      addNewItemConfirm,
      createNewId: fakeFunction,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('addNewItem and itemSyncFailed actions', () => {
    const expectedActions = [
      'addNewItem',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const addNewItemRequest = jest.fn(() => expectedActions[0]);
    const itemSyncFailed = jest.fn(() => expectedActions[1]);
    const postItem = postItemFactory({
      uri,
      httpClient,
      addNewItemRequest,
      itemSyncFailed,
      addNewItemConfirm: fakeFunction,
      createNewId: fakeFunction,
    });

    const dispatchableAction = postItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});

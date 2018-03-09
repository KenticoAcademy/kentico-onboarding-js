import { IListItem } from '../../../src/models/interfaces/IListItem';
import { ListItem } from '../../../src/models/classes/ListItem';
import { postItemFactory } from '../../../src/actions/thunk/postItemFactory';
import {
  dispatch,
  fakeFunction,
  getFirstArgumentOfCalls,
  httpClientFailure,
  httpClientSuccessFactory,
} from './thunkTestsUtils';

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
      addNewItemFailed: fakeFunction,
    });

    return postItem(actionParams)(dispatch)
      .then(() => {
        const callArguments = getFirstArgumentOfCalls(dispatch);

        expect(callArguments)
          .toEqual(expectedActions);
      })
      .catch(fakeFunction);
  });

  it('addNewItem and addNewItemFailed actions', () => {
    const expectedActions = [
      'addNewItem',
      'addNewItemFailed',
    ];
    const httpClient = httpClientFailure;
    const addNewItemRequest = jest.fn(() => expectedActions[0]);
    const addNewItemFailed = jest.fn(() => expectedActions[1]);
    const postItem = postItemFactory({
      uri,
      httpClient,
      addNewItemRequest,
      addNewItemFailed,
      addNewItemConfirm: fakeFunction,
      createNewId: fakeFunction,
    });

    return postItem(actionParams)(dispatch)
      .then(() => {
        const callArguments = getFirstArgumentOfCalls(dispatch);

        expect(callArguments)
          .toEqual(expectedActions);
      })
      .catch(fakeFunction);
  });
});

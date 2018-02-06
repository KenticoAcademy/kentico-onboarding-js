import { fetchItemsFactory } from '../../../src/actions/thunk/actionCreatorsWithDependency';
import Mock = jest.Mock;
import { IListItem } from '../../../src/models/IListItem';
import { ListItem } from '../../../src/models/ListItem';

const fetchReturnsOkResponseFactory = (body = {}) => jest
  .fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(body),
    })
  );

const fetchAlwaysFailFactory = (error: Error = new Error()) => jest
  .fn(() => Promise.reject(error));

const fakeFunction = jest.fn();
const dispatchFactory = () => jest.fn();

const handleErrors = jest.fn((res: any) => res);

const getFirstArgumentOfCalls = <T>(mockedObject: Mock<T>) =>
  mockedObject
    .mock
    .calls
    .map(call => call[0]);

const assertThatDispatchWasCalledWithActions = (dispatchableAction: (dispatch: any) => any, dispatch: any, expectedActions: any[]) =>
  dispatchableAction(dispatch)
    .then(() => {
      const callArguments = getFirstArgumentOfCalls(dispatch);

      expectedActions.forEach(act =>
        expect(callArguments)
          .toContain(act));
    });

describe('fetchItems will call dispatch with', () => {
  it('request items and receive items actions', () => {
    const expectedActions = [
      'requestItems',
      'receiveItems',
    ];
    const uri = '';
    const items: IListItem[] = [
      new ListItem({}),
    ];
    const fetch = fetchReturnsOkResponseFactory(items);
    const requestItems = jest.fn(() => expectedActions[0]);
    const receiveItems = jest.fn(() => expectedActions[1]);
    const fetchItems = fetchItemsFactory(fetch)(requestItems)(receiveItems)(fakeFunction)(fakeFunction)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableFetchItems = fetchItems(uri);

    return assertThatDispatchWasCalledWithActions(dispatchableFetchItems, dispatch, expectedActions);
  });

  it('request items, notify error and fetch failed actions', () => {
    const expectedActions = [
      'requestItems',
      'notifyError',
      'fetchFailed',
    ];
    const uri = '';
    const fetch = fetchAlwaysFailFactory();
    const requestItems = jest.fn(() => expectedActions[0]);
    const notifyError = jest.fn(() => expectedActions[1]);
    const fetchFailed = jest.fn(() => expectedActions[2]);
    const fetchItems = fetchItemsFactory(fetch)(requestItems)(fakeFunction)(notifyError)(fetchFailed)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableFetchItems = fetchItems(uri);

    return assertThatDispatchWasCalledWithActions(dispatchableFetchItems, dispatch, expectedActions);
  });
});

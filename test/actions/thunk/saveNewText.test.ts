import { saveNewTextFactory } from '../../../src/actions/thunk/saveNewTextFactory';
import { ListItem } from '../../../src/models/classes/ListItem';
import {
  assertThatDispatchWasCalledWithActions, dispatchFactory, fakeFunction, fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  handleErrors
} from './utils/utils';

describe('saveNewText will call dispatch with', () => {
  it('notify success and save item changes actions', () => {
    const expectedActions = [
      'notifySuccess',
      'saveItemChanges',
    ];
    const uri = '';
    const item: ListItem = new ListItem({});
    const text = '';
    const fetch = fetchReturnsOkResponseFactory();
    const notifySuccess = jest.fn(() => expectedActions[0]);
    const saveItemChanges = jest.fn(() => expectedActions[1]);
    const saveNewText = saveNewTextFactory(fetch)(saveItemChanges)(notifySuccess)(fakeFunction)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableSaveItem = saveNewText(uri, item, text);

    return assertThatDispatchWasCalledWithActions(dispatchableSaveItem, dispatch, expectedActions);
  });

  it('notify error action', () => {
    const expectedActions = [
      'notifyError',
    ];
    const uri = '';
    const item: ListItem = new ListItem({});
    const text = '';
    const fetch = fetchAlwaysFailFactory();
    const notifyError = jest.fn(() => expectedActions[0]);
    const saveNewText = saveNewTextFactory(fetch)(fakeFunction)(fakeFunction)(notifyError)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableSaveItem = saveNewText(uri, item, text);

    return assertThatDispatchWasCalledWithActions(dispatchableSaveItem, dispatch, expectedActions);
  });
});

import { ListItem } from '../../../src/models/classes/ListItem';
import { openItemFactory } from '../../../src/actions/thunk/openItemFactory';
import {
  assertThatDispatchWasCalledWithActions,
  configurationObjectBase,
  dispatchFactory,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
} from './utils/utils';

describe('openItem will call dispatch with', () => {
  it('open item for editing action', () => {
    const expectedActions = [
      'openItemForEditing',
    ];
    const uri = '';
    const item: ListItem = new ListItem({});
    const fetch = fetchReturnsOkResponseFactory();
    const openItemForEditing = jest.fn(() => expectedActions[0]);
    const openItem = openItemFactory({
      ...configurationObjectBase,
      fetch,
      openItemForEditing,
      notifyError: fakeFunction,
    });
    const dispatch = dispatchFactory();

    const dispatchableOpenItem = openItem(uri, item);

    return assertThatDispatchWasCalledWithActions(dispatchableOpenItem, dispatch, expectedActions);
  });

  it('notify error action', () => {
    const expectedActions = [
      'notifyError',
    ];
    const uri = '';
    const item: ListItem = new ListItem({});
    const fetch = fetchAlwaysFailFactory();
    const notifyError = jest.fn(() => expectedActions[0]);
    const openItem = openItemFactory({
      ...configurationObjectBase,
      fetch,
      notifyError,
      openItemForEditing: fakeFunction,
    });
    const dispatch = dispatchFactory();

    const dispatchableOpenItem = openItem(uri, item);

    return assertThatDispatchWasCalledWithActions(dispatchableOpenItem, dispatch, expectedActions);
  });
});

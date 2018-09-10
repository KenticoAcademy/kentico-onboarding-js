import { actionTypes } from '../../constants/actionTypes';
import { removeItem } from './removeItem';
import { ItemId } from '../../models/ItemId';
import 'isomorphic-fetch';

describe('removeItem', () => {
  test('calls modifiDeleting, toggleSynchronized, clearErrorMessage, toggleEditing and deleteItem actions if the fetch response was successful', async () => {

    const fetch = jest.fn().mockImplementation((_: ItemId) => Promise.resolve(new Response('', {status: 200})));
    const mockId = () => '42';

    const dispatch = jest.fn();
    await removeItem(fetch)(dispatch)(mockId());

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.PRE_REMOVE_ITEM);
  });

  test('calls request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const dispatch = jest.fn();
    await removeItem(fetch)(dispatch)(mockId());

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[2][0].type).toBe(actionTypes.REQUEST_FAILED_FOR_ITEM);
  });
});

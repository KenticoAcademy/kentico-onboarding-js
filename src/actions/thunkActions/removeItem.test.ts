import { actionTypes } from '../../constants/actionTypes';

import { removeItem } from './removeItem';
import { ItemId } from '../../models/ItemId';

describe('removeItem', () => {
  test('calls modifiDeleting, toggleSynchronized, clearErrorMessage, toggleEditing and deleteItem actions if the fetch response was successful',  async () => {

    const fetch = jest.fn().mockImplementation((_: ItemId) => Promise.resolve(new Response('', {status: 200})));
    const mockId = () => '42';

    const dispatch = jest.fn();
    await removeItem(fetch)(dispatch)(mockId());

    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.MODIFY_DELETING);
    expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.TOGGLE_SYNCHRONIZED);
    expect(dispatch.mock.calls[2][0].type).toBe(actionTypes.CLEAR_ERROR_MESSAGE);
    expect(dispatch.mock.calls[3][0].type).toBe(actionTypes.TOGGLE_EDITING);
    expect(dispatch.mock.calls[4][0].type).toBe(actionTypes.DELETE_ITEM);
  });

  test('calls request and failed action if the fetch response was unsuccessful',  async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const dispatch = jest.fn();
    await removeItem(fetch)(dispatch)(mockId());

    expect(dispatch).toHaveBeenCalledTimes(6);
    expect(dispatch.mock.calls[4][0].type).toBe(actionTypes.TOGGLE_SYNCHRONIZED);
    expect(dispatch.mock.calls[5][0].type).toBe(actionTypes.REQUEST_FAILED_FOR_ITEM);
  });
});

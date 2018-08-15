import { actionTypes } from '../constants/actionTypes';
import { updateItem } from './updateItem';
import { ItemId } from '../models/ItemId';

describe('updateItem', () => {
  test('calls request, addItem and success action if the fetch response was successful',  async () => {

    const fetch = jest.fn().mockImplementation((id: ItemId , text: string) => Promise.resolve(new Response('{"body":[{"Id":"' + id + '","Text":"' + text + '"}]}', {status: 200})));
    const mockId = () => '42';

    const dispatch = jest.fn();
    await updateItem(fetch)(dispatch)(mockId(), 'Karel');

    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.TOGGLE_SYNCHRONIZED);
    expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.TOGGLE_EDITING);
    expect(dispatch.mock.calls[2][0].type).toBe(actionTypes.CLEAR_ERROR_MESSAGE);
    expect(dispatch.mock.calls[3][0].type).toBe(actionTypes.UPDATE_ITEM);
    expect(dispatch.mock.calls[4][0].type).toBe(actionTypes.TOGGLE_SYNCHRONIZED);
  });

  test('calls request and failed action if the fetch response was unsuccessful',  async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const dispatch = jest.fn();
    await updateItem(fetch)(dispatch)(mockId(), 'Test');

    expect(dispatch).toHaveBeenCalledTimes(5);
    expect(dispatch.mock.calls[3][0].type).toBe(actionTypes.UPDATE_ITEM);
    expect(dispatch.mock.calls[4][0].type).toBe(actionTypes.REQUEST_FAILED_FOR_ITEM);
  });
});

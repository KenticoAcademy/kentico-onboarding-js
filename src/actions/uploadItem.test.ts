import { actionTypes } from '../constants/actionTypes';
import { uploadItem } from './uploadItem';
describe('fetchItems', () => {
  test('calls request and success action if the fetch response was successful',  async () => {
    const fetch = jest.fn().mockImplementation((text: string) => Promise.resolve(new Response('{"body": [{"Text":"' + text + '"}]}', {status: 201})));
    const mockId = () => '42';

    const dispatch = jest.fn();
    await uploadItem(fetch, mockId)(dispatch)('Karel');

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.ADD_ITEM);
    expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.TOGGLE_SYNCHRONIZED);
  });

  test('calls request and failed action if the fetch response was unsuccessful',  async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const dispatch = jest.fn();
    await uploadItem(fetch, mockId)(dispatch)('Test');

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toHaveProperty('type', actionTypes.ADD_ITEM);
    expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.REQUEST_FAILED_FOR_ITEM);
    expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.ADD_ITEM);

  });
});

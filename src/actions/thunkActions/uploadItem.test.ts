import {uploadItem} from './uploadItem';
import {actionTypes} from '../../constants/actionTypes';


describe('CreateUploadItem', () => {
  it('calls request, addItem and success action if the fetch response was successful', async () => {
    const fetch = jest.fn(() => new Object({
      Id: '42',
      Text: 'Test text',
    }));
    const dispatch = jest.fn();
    const mockId = () => '42';

    await uploadItem(fetch)(mockId)('Test')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[0][0]).toHaveProperty('type', actionTypes.ADD_ITEM);
    expect(dispatch.mock.calls[1][0]).toHaveProperty('type', actionTypes.SYNCHRONIZE_ITEM_ID);
    expect(dispatch.mock.calls[2][0]).toHaveProperty('type', actionTypes.UPDATE_SUCCEEDED);
  });

  it('calls addItem, request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const dispatch = jest.fn();
    let rejected = '';
    try {
      await uploadItem(fetch)(mockId)('Test')(dispatch);
    } catch (error) {
      rejected = error;
    }

    expect(rejected).toBe('Failed to upload');
  });
});

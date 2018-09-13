import { actionTypes } from '../../constants/actionTypes';
import { uploadItem } from './uploadItem';
import { mockStore } from '../../../test/utils/mockStore';

describe('CreateUploadItem', () => {
  test('calls request, addItem and success action if the fetch response was successful', async () => {
    const fetch = jest.fn().mockImplementation((text: string) => Promise.resolve(new Response('{"body": [{"Text":"' + text + '"}]}', {status: 201})));
    const mockId = () => '42';

    const store = mockStore();
    await store.dispatch<any>(uploadItem(fetch)(mockId)('Test'));
    const actions = store.getActions();

    expect(actions[0]).toHaveProperty('type', actionTypes.ADD_ITEM);
    expect(actions[1]).toHaveProperty('type', actionTypes.SYNCHRONIZE_ITEM_ID);
    expect(actions[2]).toHaveProperty('type', actionTypes.TOGGLE_SYNCHRONIZED);
  });

  test('calls addItem, request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const store = mockStore();
    let rejected = '';
    try {
      await store.dispatch<any>(uploadItem(fetch)(mockId)('Test'));
    } catch (error) {
      rejected = error;
    }

    expect(rejected).toBe('Failed to upload');
  });
});

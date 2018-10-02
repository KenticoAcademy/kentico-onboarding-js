import { updateItem } from './updateItem';
import { actionTypes } from '../../constants/actionTypes';

describe('CreateUpdateItem', () => {
  it('calls request, addItem and success action if the fetch response was successful', async () => {

    const fetch = jest.fn();
    const dispatch = jest.fn();
    const mockId = () => '42';

    await updateItem(fetch)(mockId(), 'Karel')(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0]).toHaveProperty('type', actionTypes.PRE_UPDATE_ITEM);
    expect(dispatch.mock.calls[1][0]).toHaveProperty('type', actionTypes.UPDATE_SUCCEEDED);
  });

  it('calls request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const dispatch = jest.fn();
    let rejected = '';
    try {
      await updateItem(fetch)(mockId(), 'Karel')(dispatch);
    } catch (error) {
      rejected = error;
    }

    expect(rejected).toBe('Failed to update');
  });
});

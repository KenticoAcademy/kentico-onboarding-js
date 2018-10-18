import {removeItem} from './removeItem';
import {actionTypes} from '../../constants/actionTypes';


describe('removeItem', () => {
  it(
    'calls modifyDeleting, setAsSynchronized, clearErrorMessage, toggleEditing and deleteItem actions if the fetch response was successful',
    async () => {

      const fetch = jest.fn();
      const dispatch = jest.fn();
      const mockId = () => '42';

      await removeItem(fetch)(mockId())(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toHaveProperty('type', actionTypes.PRE_REMOVE_ITEM);
      expect(dispatch.mock.calls[1][0]).toHaveProperty('type', actionTypes.DELETE_ITEM);
    });

  it('calls request and failed action if the fetch response was unsuccessful', async () => {
    const fetch = () => Promise.reject(Error);
    const mockId = () => '42';

    const dispatch = jest.fn();
    let rejected = '';
    try {
      await removeItem(fetch)(mockId())(dispatch);
    } catch (error) {
      rejected = error;
    }

    expect(rejected).toBe('Failed to remove');
  });
});

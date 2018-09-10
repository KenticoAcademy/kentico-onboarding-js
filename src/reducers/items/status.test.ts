import {
  receiveItems,
  requestItems
} from '../../actions/thunkActions/fetchItems';
import { status } from './status';
import { requestFailed } from '../../actions/simpleActions/requestFailed';

describe('status', () => {
  it('returns status object with no error message and fetching toggled on when action type is REQUEST_ITEMS', () => {
    const expectedState = {
      isFetching: true,
      didInvalidate: false,
      errorMessage: '',
    };

    const action = requestItems();

    const actualState = status({
      isFetching: false,
      didInvalidate: false,
      errorMessage: '',
    }, action);

    expect(actualState).toEqual(expectedState);
  });

  it('returns status object with fetching toggled off when action type is RECEIVE_ITEMS', () => {
    const expectedState = {
      isFetching: false,
      didInvalidate: false,
      errorMessage: '',
    };

    const action = receiveItems(JSON.parse('[{ }]'));

    const actualState = status({
      isFetching: true,
      didInvalidate: false,
      errorMessage: '2018-00-01 00:00:00',
    }, action);

    expect(actualState).toEqual(expectedState);
  });

  it('returns status object with fetching toggled off and error message when action type is REQUEST_FAILED', () => {
    const expectedState = {
      isFetching: false,
      didInvalidate: false,
      errorMessage: 'Test error message',
    };

    const action = requestFailed('Test error message');

    const actualState = status({
      isFetching: true,
      didInvalidate: false,
      errorMessage: '',
    }, action);

    expect(actualState).toEqual(expectedState);
  });
});

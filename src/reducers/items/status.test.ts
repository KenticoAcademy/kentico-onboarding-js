import {
  receiveItems,
  requestItems
} from '../../actions/thunkActions/fetchItems';
import { status } from './status';
import { requestFailed } from '../../actions/simpleActions/requestFailed';
import { StatusType } from '../../models/Status';

describe('status', () => {
  it('returns status object with no error message and fetching toggled on when action type is REQUEST_ITEMS', () => {
    const expectedState = new StatusType({
      isFetching: true,
      errorMessage: '',
    });

    const action = requestItems();

    const actualState = status(new StatusType({
      isFetching: false,
      errorMessage: '',
    }), action);

    expect(actualState).toEqual(expectedState);
  });

  it('returns status object with fetching toggled off when action type is RECEIVE_ITEMS', () => {
    const expectedState = new StatusType({
      isFetching: false,
      errorMessage: '',
    });

    const action = receiveItems(JSON.parse('[{ }]'));

    const actualState = status(new StatusType({
      isFetching: true,
      errorMessage: '2018-00-01 00:00:00',
    }), action);

    expect(actualState).toEqual(expectedState);
  });

  it('returns status object with fetching toggled off and error message when action type is REQUEST_FAILED', () => {
    const expectedState = new StatusType({
      isFetching: false,
      errorMessage: 'Test error message',
    });

    const action = requestFailed('Test error message');

    const actualState = status(new StatusType({
      isFetching: true,
      errorMessage: '',
    }), action);

    expect(actualState).toEqual(expectedState);
  });
});

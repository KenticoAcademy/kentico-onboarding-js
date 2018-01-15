import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  ITEMS_FETCH_SUCCESS, TODO_LIST_ITEM_INSERT
} from '../constants/actionTypes';
import { fetchItemsFactory } from './actionCreators';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const middleware = [thunk.withExtraArgument('v1/items')];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

describe('Async actions', () => {
  it('creates ITEMS_FETCH_SUCCESS', (done) => {
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const expectedActions = [
      {
        type: TODO_LIST_ITEM_INSERT,
        payload: fetchedTestItem
      },
      {
        type: ITEMS_FETCH_SUCCESS,
        payload: {}
      }];
    const mock = new MockAdapter(axios);
    mock.onGet('v1/items').reply(200, [
        {
          Id: fetchedTestItem.id,
          Text: fetchedTestItem.text
        }
      ]
    );
    const fetchItems = fetchItemsFactory(axios);

    store.dispatch(fetchItems())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
      .catch(err => console.log(err));
  }, 30000);
});

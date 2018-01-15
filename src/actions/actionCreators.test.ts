import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  ITEMS_FETCH_ERROR,
  ITEMS_FETCH_SUCCESS, TODO_LIST_ITEM_INSERT
} from '../constants/actionTypes';
import { fetchItemsFactory } from './actionCreators';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const url = 'v1/items';
const middleware = [thunk.withExtraArgument(url)];
const mockStore = configureMockStore(middleware);
const store = mockStore({});
const mock = new MockAdapter(axios);

describe('Async actions', () => {

  it('creates TODO_LIST_ITEM_INSERT, ITEMS_FETCH_SUCCESS on correct request', (done) => {
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
      }
    ];
    mock.onGet(url).reply(200, [
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
  });

  it('creates ITEMS_FETCH_ERROR on bad request', (done) => {
    const expectedAction = [
      {
        type: ITEMS_FETCH_ERROR,
        payload: {
          errorText: '400 Bad Request'
        }
      }
    ];
    const fetchItems = fetchItemsFactory(axios);
    mock.restore();
    mock.onGet(url).reply(400);

    store.dispatch(fetchItems())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      })
      .catch(err => console.log(err));
  });
});

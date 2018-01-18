import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  ITEM_POST_ERROR,
  ITEM_POST_SUCCESS,
  ITEMS_FETCH_ERROR,
  ITEMS_FETCH_SUCCESS, TODO_LIST_ITEM_INSERT
} from '../constants/actionTypes';
import { fetchItemsFactory, postItemFactory } from './actionCreators';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const url = 'v1/items';
const middleware = [thunk.withExtraArgument(url)];
const mockStore = configureMockStore(middleware);
const store = mockStore({});
const mock = new MockAdapter(axios);

afterEach(() => {
  store.clearActions();
  // mock.restore();
});

describe('Async actions', () => {

  it('creates TODO_LIST_ITEM_INSERT, ITEMS_POST_SUCCESS on correct POST request', (done) => {
    const postTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
      text: 'item'
    };
    const expectedActions = [
      {
        type: TODO_LIST_ITEM_INSERT,
        payload: postTestItem
      },
      {
        type: ITEM_POST_SUCCESS,
        payload: {}
      }
    ];
    mock.onPost(url).reply(201, {
        Id: postTestItem.id,
        Text: postTestItem.text
      }
    );
    const postItem = postItemFactory(axios);

    store.dispatch(postItem(postTestItem.text))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_INSERT, ITEMS_FETCH_SUCCESS on correct GET request', (done) => {
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

  it('creates ITEMS_FETCH_ERROR on bad GET request', (done) => {
    const expectedAction = [
      {
        type: ITEMS_FETCH_ERROR,
        payload: {
          errorText: '400 Bad Request'
        }
      }
    ];
    mock.restore();
    mock.onGet(url).reply(400);

    const fetchItems = fetchItemsFactory(axios);

    store.dispatch(fetchItems())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEMS_POST_ERROR on bad POST request', (done) => {
    const postTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
      text: 'item'
    };
    const expectedAction = [
      {
        type: ITEM_POST_ERROR,
        payload: {
          errorText: '400 Bad Request'
        }
      }
    ];
    // mock.restore();
    mock.onGet(url).reply(400);

    const postItem = postItemFactory(axios);

    store.dispatch(postItem(postTestItem))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      })
      .catch(err => console.log(err));
  });
});

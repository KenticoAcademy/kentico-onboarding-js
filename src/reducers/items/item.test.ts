import { createItem, editItem } from '../../actions/actionCreators';
import { item } from './item';
import { Item } from '../../models/Item';

describe('item', () => {
  it('should create the Item Dog on CREATE_ITEM action', () => {
    const action = createItem('Dog');
    const defaultState = new Item();
    const expectedState = new Item({id: action.payload.id, text: 'Dog'});

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });

  it('should edit the Item Dog on EDIT_ITEM action', () => {
    const actionCreate = createItem('Dog');
    const action = editItem(actionCreate.payload.id , 'Doga');
    const defaultState = new Item({id: actionCreate.payload.id, text: 'Dog'});
    const expectedState = new Item({id: actionCreate.payload.id, text: 'Doga'});

    const state = item(defaultState, action);

    expect(state).toEqual(expectedState);
  });
});

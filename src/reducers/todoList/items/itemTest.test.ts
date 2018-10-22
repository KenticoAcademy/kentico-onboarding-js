import { item } from './item';
import { ListItem } from '../../../models/ListItem';
import {
  startItemEditing,
  stopItemEditing,
  updateItemText,
} from '../../../actions';
import { IAction } from '../../../actions/IAction';

describe('item reducer', () => {
  const itemId = '5';
  const defaultItem: ListItem = new ListItem({
    id: itemId,
    isInEditMode: false,
    text: 'Lorem ipsum',
  });

  const unknownAction: IAction = {
    type: 'UNKNOWN_ACTION',
    payload: {
      text: 'Run the tests',
      id: itemId,
    },
  };

  it('should return the initial state with undefined state', () => {
    const expectedState: ListItem = new ListItem();

    const actualState = item(undefined, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should return previous state on unknown action', () => {
    const expectedState: ListItem = defaultItem;

    const actualState = item(defaultItem, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should start edit mode of selected item when ITEM_START_EDITING action is dispatched', () => {
    const expectedState: ListItem = defaultItem.with({isInEditMode: true});

    const actualState = item(defaultItem, startItemEditing(itemId));

    expect(actualState).toEqual(expectedState);
  });

  it('should end edit mode of selected item when ITEM_STOP_EDITING action is dispatched', () => {
    const defaultItemInEditMode: ListItem = defaultItem.with({isInEditMode: true});
    const expectedState: ListItem = defaultItem.with({isInEditMode: false});

    const actualState = item(defaultItemInEditMode, stopItemEditing(itemId));

    expect(actualState).toEqual(expectedState);
  });

  it('should update selected item when ITEM_TEXT_UPDATE action is dispatched', () => {
    const newText = 'Buy Beer';
    const expectedState: ListItem = defaultItem.with({text: newText});

    const actualState = item(defaultItem, updateItemText(defaultItem.id, newText));

    expect(actualState).toEqual(expectedState);
  });
});

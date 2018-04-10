import { actionTypes } from '../../constants/actionTypes';
import { dataLoaded as dataLoadedReducer } from './dataLoaded';
import { itemsLoadingToggle } from '../../actions';

describe('group actions reducer works correctly', () => {
  it('ITEMS_LOADING_TOGGLE returns true if toggled on false', () => {
    const action = itemsLoadingToggle();
    const actual = dataLoadedReducer(false, action);

    expect(actual).toEqual(true);
  });

  it('ITEMS_LOADING_TOGGLE returns false if toggled on true', () => {
    const action = itemsLoadingToggle();
    const actual = dataLoadedReducer(true, action);

    expect(actual).toEqual(false);
  });

  it('undefined action returns default state', () => {
    const action = { type: actionTypes.ITEM_VALUE_CHANGED, payload: undefined };
    const actual = dataLoadedReducer(undefined, action);

    expect(actual).toEqual(false);
  });

  it('undefined action returns previous state', () => {
    const state = false;

    const action = { type: actionTypes.ITEM_VALUE_CHANGED, payload: undefined };
    const actual = dataLoadedReducer(state, action);

    expect(actual).toEqual(state);
  });
});

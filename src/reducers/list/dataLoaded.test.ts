import { actionTypes } from '../../constants/actionTypes';
import { dataLoaded as dataLoadedReducer } from './dataLoaded';
import { itemsLoading, itemsLoadingDone } from '../../actions';

describe('group actions reducer works correctly', () => {
  it('ITEMS_LOADING returns false', () => {
    const action = itemsLoading();
    const actual = dataLoadedReducer(false, action);

    expect(actual).toEqual(false);
  });

  it('ITEMS_LOADING_DONE returns true', () => {
    const action = itemsLoadingDone();
    const actual = dataLoadedReducer(false, action);

    expect(actual).toEqual(true);
  });

  it('undefined action returns default state', () => {
    const action = { type: actionTypes.ITEM_VALUE_CHANGED };
    const actual = dataLoadedReducer(undefined, action);

    expect(actual).toEqual(false);
  });

  it('undefined action returns previous state', () => {
    const state = false;

    const action = { type: actionTypes.ITEM_VALUE_CHANGED };
    const actual = dataLoadedReducer(state, action);

    expect(actual).toEqual(state);
  });
});

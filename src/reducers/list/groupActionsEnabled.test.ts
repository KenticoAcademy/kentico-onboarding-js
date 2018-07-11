import { actionTypes } from '../../constants/actionTypes';
import { groupActionsEnabled as groupActionsEnabledReducer } from './groupActionsEnabled';
import { groupActionsToggle } from '../../actions/creators/listActions';

describe('group actions reducer works correctly', () => {
  it('ITEMS_GROUP_ACTIONS_TOGGLE returns true if toggled on false', () => {
    const action = groupActionsToggle();
    const actual = groupActionsEnabledReducer(false, action);

    expect(actual).toEqual(true);
  });

  it('ITEMS_GROUP_ACTIONS_TOGGLE returns false if toggled on true', () => {
    const action = groupActionsToggle();
    const actual = groupActionsEnabledReducer(true, action);

    expect(actual).toEqual(false);
  });

  it('undefined action returns default state', () => {
    const action = { type: actionTypes.ITEM_VALUE_CHANGED };
    const actual = groupActionsEnabledReducer(undefined, action);

    expect(actual).toEqual(true);
  });

  it('undefined action returns previous state', () => {
    const state = false;

    const action = { type: actionTypes.ITEM_VALUE_CHANGED };
    const actual = groupActionsEnabledReducer(state, action);

    expect(actual).toEqual(state);
  });
});

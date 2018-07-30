import * as ActionType from './ActionTypes';

export const addItemCreator = getIdentifier =>
  text => ({
    type: ActionType.AddItem,
    payload: {
      id: getIdentifier(),
      text
    }
  });

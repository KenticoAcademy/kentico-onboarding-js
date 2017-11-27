import { generateId } from '../utils/generateId';
import { OrderedMap } from '../../node_modules/immutable/dist/immutable';

describe('actionCreators', () => {

  it('addItem adds item with correct attributes to the state', () => {
    const newId = generateId();
    const newItem = {
      id: newId,
      text: 'tested item',
      isBeingEdited: false,
    };
    var stateBefore = new OrderedMap();
    const stateAfter = [
      {
        newId: {
          id: newId,
          text: 'tested item',
          isBeingEdited: false,
        },
      },
    ];

    const result = stateBefore.dispatch(addItem(newId, 'tested item');)

    expect(result).toMatch(stateAfter);
  });

});

import {OrderedMap} from 'immutable';
import {selectItemIdsMemoized} from './selectItemIdsMemoized.ts';


describe('selectItemIdsMemoized', () => {
  it('return the same object when is given two different objects with the same value', () => {
    const firstArr = new OrderedMap([[1, 2], [3, 4]]);
    const secondArr = new OrderedMap([[1, 2], [3, 4]]);

    expect(selectItemIdsMemoized(firstArr)).toBe(selectItemIdsMemoized(secondArr));
  });
});

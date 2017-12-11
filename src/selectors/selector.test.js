import { memoized } from './selector';

describe('memoized', () => {
  it('return the same object when is given two different objects with the same value', () => {
    const firstArr = new Array([1, 2, 3]);
    const secondArr = new Array([1, 2, 3]);

    expect(memoized(firstArr)).toEqual(memoized(secondArr));
  });
});

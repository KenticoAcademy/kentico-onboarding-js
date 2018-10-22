import { getItemsIds } from './getItemsIds';

describe('getItemsIds() ', () => {
  it('returns the same result when given two different objects with the same value', () => {
    const ids =  ['1', '2', '3', '4'];
    const ids2 =  ['1', '2', '3', '4'];

    const memoizedIds1 = getItemsIds(ids);
    const memoizedIds2 = getItemsIds(ids2);

    expect(memoizedIds1).toEqual(memoizedIds2);
  });

  it('returns the same result when called multiple times with the same input', () => {
    const ids =  ['1', '2', '3', '4'];

    const memoizedIds1 = getItemsIds(ids);
    const memoizedIds2 = getItemsIds(ids);

    expect(memoizedIds1).toEqual(memoizedIds2);
  });
});


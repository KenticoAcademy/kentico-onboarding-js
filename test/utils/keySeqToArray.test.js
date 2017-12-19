import { keySeqToArray } from '../../src/utils/keySeqToArray';
import { Seq } from 'immutable';

describe('keySeqToArray', () => {
  it('will call keySeqToArray 2 times on the same arguments', () => {
    const arr = Seq.Indexed.of(1, 2, 3, 4);

    const result1 = keySeqToArray(arr);
    const result2 = keySeqToArray(arr);

    expect(result1)
      .toBe(result2);
  });

  it('will call keySeqToArray 2 times on different arguments', () => {
    const arr1 = Seq.Indexed.of(1, 2, 3, 4);
    const arr2 = arr1.take(3);
    const result1 = keySeqToArray(arr1);
    const result2 = keySeqToArray(arr2);

    expect(result1)
      .not
      .toBe(result2);
  });
});

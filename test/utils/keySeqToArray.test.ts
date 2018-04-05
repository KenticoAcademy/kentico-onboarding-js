import { keySeqToArray } from '../../src/utils/keySeqToArray';
import { Seq } from 'immutable';

describe('keySeqToArray', () => {
  it('will return the same array when called 2 times with the same arguments', () => {
    const arr = Seq.Indexed.of(1, 2, 3, 4);

    const result1 = keySeqToArray(arr);
    const result2 = keySeqToArray(arr);

    expect(result1)
      .toBe(result2);
  });

  it('will return different arrays when called 2 times with different arguments', () => {
    const arr1 = Seq.Indexed.of(1, 2, 3, 4);
    const arr2 = arr1.take(3).toIndexedSeq();
    const result1 = keySeqToArray(arr1);
    const result2 = keySeqToArray(arr2);

    expect(result1)
      .not
      .toBe(result2);
  });
});

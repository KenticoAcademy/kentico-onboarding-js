import { indexedSequenceToArray } from '../../src/utils/indexedSequenceToArray';
import { Seq } from 'immutable';

describe('indexedSequenceToArray', () => {
  it('will return the same array when called 2 times with the same arguments', () => {
    const arr = Seq.Indexed.of(1, 2, 3, 4);

    const result1 = indexedSequenceToArray(arr);
    const result2 = indexedSequenceToArray(arr);

    expect(result1)
      .toBe(result2);
  });

  it('will return different arrays when called 2 times with different arguments', () => {
    const arr1 = Seq.Indexed.of(1, 2, 3, 4);
    const arr2 = arr1.take(3).toIndexedSeq();
    const result1 = indexedSequenceToArray(arr1);
    const result2 = indexedSequenceToArray(arr2);

    expect(result1)
      .not
      .toBe(result2);
  });
});

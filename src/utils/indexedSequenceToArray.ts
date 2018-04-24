import * as memoizee from 'memoizee';
import { Seq } from 'immutable';

export const indexedSequenceToArray = memoizee(<T>(keySeq: Seq.Indexed<T>): T[] => keySeq.toArray());

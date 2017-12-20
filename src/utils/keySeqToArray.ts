import moize from 'moize';
import { Seq } from 'immutable';

const _keySeqToArray = <T>(keySeq: Seq.Indexed<T>): Array<T> => keySeq.toArray();
export const keySeqToArray = moize(_keySeqToArray);

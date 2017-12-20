import moize from 'moize';
import { Seq } from 'immutable';

type IKeySeqToArray = <T>(keySeq: Seq.Indexed<T>) => T[];

const _keySeqToArray: IKeySeqToArray = keySeq => keySeq.toArray();
export const keySeqToArray = moize(_keySeqToArray) as IKeySeqToArray;

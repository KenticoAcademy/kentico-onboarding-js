import * as mem from 'mem';
import { Seq } from 'immutable';
import { key } from '../@types/key';

const arraySequence = (sequence: Seq.Indexed<key>): Array<key> => sequence.toArray();

export const getMemoizedKeys = mem(arraySequence);

export const getMemoizedValues = mem(arraySequence);

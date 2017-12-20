import moize from 'moize';

const _keySeqToArray = keySeq => keySeq.toArray();
export const keySeqToArray = moize(_keySeqToArray);

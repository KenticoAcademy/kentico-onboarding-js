import mem from 'mem';

const arraySequence = sequence => sequence.toArray();

export const getMemoizedKeys = mem(arraySequence);

export const getMemoizedValues = mem(arraySequence);

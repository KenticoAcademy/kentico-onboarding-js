import { default as getV4Identifier } from 'uuid/v4';

export const getIdentifier = () => getV4Identifier();
export const getEmptyIdentifier = () => '00000000-0000-0000-0000-000000000000';

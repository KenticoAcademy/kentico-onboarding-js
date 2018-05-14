import { v4 as getV4Identifier } from 'uuid';

export const getIdentifier = (): Key => getV4Identifier();

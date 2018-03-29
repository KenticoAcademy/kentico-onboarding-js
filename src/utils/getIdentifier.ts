import { v4 as getV4Identifier } from 'uuid';
import { Key } from '../@types/Key';

export const getIdentifier = (): Key => getV4Identifier();

import { v4 as getV4Identifier } from 'uuid';
import { key } from '../@types/key';

export const getIdentifier = (): key => getV4Identifier();

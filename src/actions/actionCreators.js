import { getIdentifier } from '../utils/uuidService';
import { addItemFactory } from './listActions/addItemFactory';

export const addItem = addItemFactory(getIdentifier);
export * from './listActions';
export * from './itemActions';

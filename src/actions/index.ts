import { getIdentifier } from '../utils/getIdentifier';
import { addItemFactory } from './listActions/addItemFactory';

export const addItem = addItemFactory(getIdentifier);
export * from './listActions/listActions';
export * from './itemActions/itemActions';

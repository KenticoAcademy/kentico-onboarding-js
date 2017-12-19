import { addNewItemFactory } from './actionCreatorsWithDependency';
import { createNewId } from '../utils/createNewId';

export const addNewItem = addNewItemFactory(createNewId);

export * from './actionCreators';


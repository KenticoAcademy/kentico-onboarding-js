import { addNewItem as _addNewItem } from './actionCreatorsWithDependency';
import { createNewId } from '../utils/createNewId';

const addNewItemFactory = () => _addNewItem.bind(null, createNewId);
export const addNewItem = addNewItemFactory();

export * from './actionCreators';


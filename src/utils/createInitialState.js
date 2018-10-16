import { OrderedMap } from 'immutable';
import { getDefaultItems } from './getDefaultItems';

const mappedItems = getDefaultItems().map((item) => ([item.id, item]));
const defaultItemsOrderedMap = OrderedMap(mappedItems);
const initialState = { todoList: { items: defaultItemsOrderedMap } };
export const createInitialState = () => initialState;

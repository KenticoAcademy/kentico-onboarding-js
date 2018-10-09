import { OrderedMap } from 'immutable';
import { getDefaultItems } from './getDefaultItems';

const defaultItemsOrderedMap = OrderedMap(getDefaultItems());
const initialState = { todoListReducer: { items: defaultItemsOrderedMap } };
export const createInitialState = () => initialState;

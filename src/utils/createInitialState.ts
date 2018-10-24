import { Iterable, OrderedMap } from 'immutable';
import { getDefaultItems } from './getDefaultItems';
import { ListItem } from '../models/ListItem';
import { IStore } from '../store/IAppState';

const mappedItems = getDefaultItems().map((item: ListItem) => (Iterable<[string, ListItem]>([item.id, item])));
const defaultItemsOrderedMap: OrderedMap<Uuid, ListItem> = OrderedMap(mappedItems);
const initialState: IStore = {todoList: {items: defaultItemsOrderedMap}};
export const createInitialState = () => initialState;

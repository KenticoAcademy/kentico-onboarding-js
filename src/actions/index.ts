import { generateId } from '../utils/generateId';
import { actionFetch } from './actionFetch';
import { uploadItem } from './uploadItem';
import { fetchItems } from './fetchItems';

export * from './actionCreators';

const uploadItemInjected = uploadItem(actionFetch('POST'), generateId);
export { uploadItemInjected as uploadItem };

const fetchItemsInjected = fetchItems(actionFetch('GET'));
export { fetchItemsInjected as fetchItems };

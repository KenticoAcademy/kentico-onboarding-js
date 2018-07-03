import { generateId } from '../utils/generateId';
import { actionFetch } from './actionFetch';
import { uploadItem } from './uploadItem';
import { fetchItems } from './fetchItems';
import { updateItem } from './updateItem';
import { removeItem } from './removeItem';

export * from './actionCreators';

const uploadItemInjected = uploadItem(actionFetch('POST'), generateId);
export { uploadItemInjected as uploadItem };

const fetchItemsInjected = fetchItems(actionFetch('GET'));
export { fetchItemsInjected as fetchItems };

const updateItemInjected = updateItem(actionFetch('PUT'));
export { updateItemInjected as updateItem };

const removeItemInjected = removeItem(actionFetch('DELETE'));
export { removeItemInjected as removeItem };

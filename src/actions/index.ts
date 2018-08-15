import { generateId } from '../utils/generateId';
import { actionFetch } from './actionFetch';
import { uploadItem } from './thunkActions/uploadItem';
import { fetchItems } from './thunkActions/fetchItems';
import { updateItem } from './thunkActions/updateItem';
import { removeItem } from './thunkActions/removeItem';
import { ItemId } from '../models/ItemId';

const uploadItemInjected = uploadItem(actionFetch('POST'), generateId);
export { uploadItemInjected as uploadItem };

const uploadItemAgainInjected = (id: ItemId) => uploadItem(actionFetch('POST'), () => id);
export { uploadItemAgainInjected as uploadItemAgain };

const fetchItemsInjected = fetchItems(actionFetch('GET'));
export { fetchItemsInjected as fetchItems };

const updateItemInjected = updateItem(actionFetch('PUT'));
export { updateItemInjected as updateItem };

const removeItemInjected = removeItem(actionFetch('DELETE'));
export { removeItemInjected as removeItem };

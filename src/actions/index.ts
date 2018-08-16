import { generateId } from '../utils/generateId';
import { applyActionFetch } from './applyActionFetch';
import { uploadItem } from './thunkActions/uploadItem';
import { fetchItems } from './thunkActions/fetchItems';
import { updateItem } from './thunkActions/updateItem';
import { removeItem } from './thunkActions/removeItem';
import { ItemId } from '../models/ItemId';

const uploadItemInjected = uploadItem(applyActionFetch('POST'), generateId);
export { uploadItemInjected as uploadItem };

const uploadItemAgainInjected = (id: ItemId) => uploadItem(applyActionFetch('POST'), () => id);
export { uploadItemAgainInjected as uploadItemAgain };

const fetchItemsInjected = fetchItems(applyActionFetch('GET'));
export { fetchItemsInjected as fetchItems };

const updateItemInjected = updateItem(applyActionFetch('PUT'));
export { updateItemInjected as updateItem };

const removeItemInjected = removeItem(applyActionFetch('DELETE'));
export { removeItemInjected as removeItem };

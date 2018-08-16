import { generateId } from '../utils/generateId';
import { applyActionFetch } from './applyActionFetch';
import { uploadItem } from './thunkActions/uploadItem';
import { fetchItems } from './thunkActions/fetchItems';
import { updateItem } from './thunkActions/updateItem';
import { removeItem } from './thunkActions/removeItem';
import { ItemId } from '../models/ItemId';
import { requestMethodTypes } from '../constants/requestMethodTypes';

const uploadItemInjected = uploadItem(applyActionFetch(requestMethodTypes.POST), generateId);
export { uploadItemInjected as uploadItem };

const uploadItemAgainInjected = (id: ItemId) => uploadItem(applyActionFetch(requestMethodTypes.POST), () => id);
export { uploadItemAgainInjected as uploadItemAgain };

const fetchItemsInjected = fetchItems(applyActionFetch(requestMethodTypes.GET));
export { fetchItemsInjected as fetchItems };

const updateItemInjected = updateItem(applyActionFetch(requestMethodTypes.PUT));
export { updateItemInjected as updateItem };

const removeItemInjected = removeItem(applyActionFetch(requestMethodTypes.DELETE));
export { removeItemInjected as removeItem };

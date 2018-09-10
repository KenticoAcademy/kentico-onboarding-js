import { generateId } from '../utils/generateId';
import { actionFetchFactory } from '../utils/actionFetchFactory';
import { uploadItem } from './thunkActions/uploadItem';
import { fetchItems } from './thunkActions/fetchItems';
import { updateItem } from './thunkActions/updateItem';
import { removeItem } from './thunkActions/removeItem';
import { ItemId } from '../models/ItemId';
import { requestMethodTypes } from '../constants/requestMethodTypes';

const uploadItemInjected = uploadItem(actionFetchFactory(requestMethodTypes.POST), generateId);
export { uploadItemInjected as uploadItem };

const uploadItemAgainInjected = (id: ItemId) => uploadItem(actionFetchFactory(requestMethodTypes.POST), () => id);
export { uploadItemAgainInjected as uploadItemAgain };

const fetchItemsInjected = fetchItems(actionFetchFactory(requestMethodTypes.GET));
export { fetchItemsInjected as fetchItems };

const updateItemInjected = updateItem(actionFetchFactory(requestMethodTypes.PUT));
export { updateItemInjected as updateItem };

const removeItemInjected = removeItem(actionFetchFactory(requestMethodTypes.DELETE));
export { removeItemInjected as removeItem };

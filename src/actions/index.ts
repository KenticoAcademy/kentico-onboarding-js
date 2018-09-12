import { generateId } from '../utils/generateId';
import { actionFetchFactory } from '../utils/actionFetchFactory';
import { uploadItem } from './thunkActions/uploadItem';
import { fetchItems } from './thunkActions/fetchItems';
import { updateItem } from './thunkActions/updateItem';
import { removeItem } from './thunkActions/removeItem';
import { requestMethodTypes } from '../constants/requestMethodTypes';

export const CreateUploadItem = uploadItem(actionFetchFactory(requestMethodTypes.POST))(generateId);

export const CreateUploadItemAgain = uploadItem(actionFetchFactory(requestMethodTypes.POST));

export const CreateFetchItems = fetchItems(actionFetchFactory(requestMethodTypes.GET));

export const CreateUpdateItem = updateItem(actionFetchFactory(requestMethodTypes.PUT));

export const CreateRemoveItem = removeItem(actionFetchFactory(requestMethodTypes.DELETE));

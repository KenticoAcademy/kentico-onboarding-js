import { getAllItemsActionCreator } from '../thunkActionCreators/getAllItemsActionCreator';
import { createUrl } from '../../utils/createUrl';

export const getAllItems = getAllItemsActionCreator({
  getFromServer: () => fetch(createUrl(), getOptions),
});

const getOptions: RequestInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

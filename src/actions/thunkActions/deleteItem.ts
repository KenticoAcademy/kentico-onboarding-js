import { deleteItemActionCreator } from '../thunkActionCreators/deleteItemActionCreator';
import { createUrl } from '../../utils/createUrl';

export const deleteItem = deleteItemActionCreator({
  deleteFromServer: (id: Guid) => fetch(createUrl(id), deleteOptions),
});

const deleteOptions: RequestInit = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
};

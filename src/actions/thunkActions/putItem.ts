import { putItemActionCreator } from '../thunkActionCreators/putItemActionCreator';
import { createUrl } from '../../utils/createUrl';

export const putItem = putItemActionCreator({
  putToServer: (id: Guid, text: string) => fetch(createUrl(id), putOptions(id, text)),
});

const putOptions = (id: Guid, text: string): RequestInit => {
  const dbItem: FetchedItem = {
    id,
    text,
    creationTime: '2000-01-01',
    lastModificationTime: '2000-01-01'};
  return ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbItem)
  });
};

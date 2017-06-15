import { IAction } from './IAction';
import { Item } from '../models/Item';
import {
  API_VERSION_1,
  ITEMS
} from '../constants/urls';

interface PostItemDependencies {
  positivelyCreateItemLocally: (item: Item) => IAction;
  fetch: Fetch;
  generateId: () => string;
  receivePostItemError: (error: Error, itemUeid: string) => IAction;
  receiveItemCreated: (json: Item) => IAction;
  parseResponse: (errorMessage: string) => (response: Response) => Promise<any>;
}

const postItemFactory = (dependencies: PostItemDependencies) =>
  (value: string) => {
    return (dispatch: Dispatch): Promise<IAction> => {
      const item = new Item({ ueid: dependencies.generateId(), value });
      dispatch(dependencies.positivelyCreateItemLocally(item));

      return dependencies.fetch(
        API_VERSION_1 + ITEMS,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ueid: item.ueid, value: item.value }),
        })
        .then(dependencies.parseResponse('Item was not correctly saved on the server'))
        .then((json: Item) => dispatch(dependencies.receiveItemCreated(json)))
        .catch((error: Error) => dispatch(dependencies.receivePostItemError(error, item.ueid)));
    };
  };

export { postItemFactory };

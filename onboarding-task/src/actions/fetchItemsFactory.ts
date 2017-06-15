import { IAction } from './IAction';
import {
  API_VERSION_1,
  ITEMS
} from '../constants/urls';

interface FetchItemsDependencies {
  requestItems: () => IAction;
  fetch: Fetch;
  parseResponse: (errorMessage: string) => (response: Response) => Promise<any>;
  receiveItems: (json: any) => IAction;
  receiveItemsFetchingError: (error: Error) => IAction;
}

const fetchItemsFactory = (dependencies: FetchItemsDependencies) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(dependencies.requestItems());
    return dependencies.fetch(API_VERSION_1 + ITEMS)
      .then(dependencies.parseResponse('Loading the Item list did not go well'))
      .then((json: JSON) => dispatch(dependencies.receiveItems(json)))
      .catch((error: Error) => dispatch(dependencies.receiveItemsFetchingError(error)));
  };
};
export { fetchItemsFactory }

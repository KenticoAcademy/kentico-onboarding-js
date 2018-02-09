import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

export const fetchItemsFactory =
  ({
     fetch,
     requestItems,
     receiveItems,
     fetchFailed,
     notifyError,
     registerAction,
     handleErrors,
   }: {
    fetch: IFetch,
    requestItems: (uri: string) => IAction,
    receiveItems: (items: IListItem[]) => IAction,
    fetchFailed: (err: Error) => IAction,
    notifyError: (message: string) => IAction,
    registerAction: (action: () => void) => IAction,
    handleErrors: (response: Response) => Response,
  }) =>
    (uri: string) =>
      (dispatch: Dispatch<IAction>) => {
        const action = () => {
          dispatch(requestItems(uri));

          return fetch(uri)
            .then(handleErrors)
            .then((res: Response) => res.json())
            .then((items: IListItem[]) => dispatch(receiveItems(items)))
            .catch((err: Error) => {
              dispatch(notifyError('Items failed to load.'));
              dispatch(fetchFailed(err));
            });
        };

        dispatch(registerAction(action));

        return action();
      };

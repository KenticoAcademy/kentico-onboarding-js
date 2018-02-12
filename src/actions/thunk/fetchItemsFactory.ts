import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

interface IFetchItemsFactoryDependencies {
  readonly fetch: IFetch;
  readonly requestItems: (uri: string) => IAction;
  readonly receiveItems: (items: IListItem[]) => IAction;
  readonly fetchFailed: (message: string) => IAction;
  readonly registerAction: (action: () => void) => IAction;
  readonly handleErrors: (response: Response) => Response;
}

export const fetchItemsFactory = (deps: IFetchItemsFactoryDependencies) =>
    (uri: string) =>
      (dispatch: Dispatch<IAction>) => {
        const action = () => {
          dispatch(deps.requestItems(uri));

          return fetch(uri)
            .then(deps.handleErrors)
            .then((res: Response) => res.json())
            .then((items: IListItem[]) => dispatch(deps.receiveItems(items)))
            .catch(() => {
              dispatch(deps.registerAction(action));
              return dispatch(deps.fetchFailed('Items failed to load.'));
            });
        };

        return action();
      };

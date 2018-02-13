import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

interface IPostItemFactoryDependencies {
  readonly fetch: IFetch;
  readonly addNewItem: (item: IListItem) => IAction;
  readonly notifySuccess: (message: string) => IAction;
  readonly notifyError: (message: string) => IAction;
  readonly registerAction: (action: () => void) => IAction;
  readonly handleErrors: (response: Response) => Response;
}

export interface IPostItemActionParams {
  readonly uri: string;
  readonly text: string;
}

export const postItemFactory = (deps: IPostItemFactoryDependencies) =>
    ({ uri, text }: IPostItemActionParams) =>
      (dispatch: Dispatch<IAction>) => {
        const newItem = {
          isBeingEdited: false,
          text,
        };

        const action = () => deps.fetch(
          uri,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
          }
        )
          .then(deps.handleErrors)
          .then((res: Response) => res.json())
          .then((returnedItem: IListItem) => {
            dispatch(deps.notifySuccess('Item was created.'));
            return dispatch(deps.addNewItem(returnedItem));
          })
          .catch(() => {
            dispatch(deps.registerAction(action));
            return dispatch(deps.notifyError('Item failed to create.'));
          });

        return action();
      };

import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

interface IDeleteItemFactoryDependencies {
  readonly fetch: IFetch;
  readonly deleteItem: (id: Guid) => IAction;
  readonly notifySuccess: (message: string) => IAction;
  readonly notifyError: (message: string) => IAction;
  readonly registerAction: (action: () => void) => IAction;
  readonly handleErrors: (response: Response) => Response;
}

export const deleteItemFactory = (deps: IDeleteItemFactoryDependencies) =>
    (uri: string, id: Guid) =>
      (dispatch: Dispatch<IAction>) => {
        const action = () => fetch(
          uri + id,
          {
            method: 'DELETE',
          },
        )
          .then(deps.handleErrors)
          .then(() => {
            dispatch(deps.notifySuccess('Item was deleted.'));
            return dispatch(deps.deleteItem(id));
          })
          .catch(() => {
            dispatch(deps.registerAction(action));
            return dispatch(deps.notifyError('Item failed to delete.'));
          });

        return action();
      };

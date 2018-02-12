import { IListItem } from '../../models/interfaces/IListItem';
import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

interface ISaveNewTextFactoryDependencies {
  readonly fetch: IFetch;
  readonly saveItemChanges: (id: Guid, text: string) => IAction;
  readonly notifySuccess: (message: string) => IAction;
  readonly notifyError: (message: string) => IAction;
  readonly registerAction: (action: () => void) => IAction;
  readonly handleErrors: (response: Response) => Response;
}

export const saveNewTextFactory = (deps: ISaveNewTextFactoryDependencies) =>
    (uri: string, item: IListItem, text: string) =>
      (dispatch: Dispatch<IAction>) => {
        const { id } = item;
        const updatedItem = {
          text,
          isBeingEdited: false,
          id,
        };

        const action = () => fetch(
          uri + id,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
          },
        )
          .then(deps.handleErrors)
          .then(() => {
            dispatch(deps.notifySuccess('Item text was updated.'));
            return dispatch(deps.saveItemChanges(item.id, text));
          })
          .catch(() => {
            dispatch(deps.registerAction(action));
            return dispatch(deps.notifyError('Item failed to update.'));
          });

        return action();
      };

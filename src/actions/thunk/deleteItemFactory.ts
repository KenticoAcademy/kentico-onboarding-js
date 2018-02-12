import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

export const deleteItemFactory =
  ({
     fetch,
     deleteItem,
     notifySuccess,
     notifyError,
     registerAction,
     handleErrors,
   }: {
    fetch: IFetch,
    deleteItem: (id: Guid) => IAction,
    notifySuccess: (message: string) => IAction,
    notifyError: (message: string) => IAction,
    registerAction: (action: () => void) => IAction,
    handleErrors: (response: Response) => Response,
  }) =>
    (uri: string, id: Guid) =>
      (dispatch: Dispatch<IAction>) => {
        const action = () => fetch(
          uri + id,
          {
            method: 'DELETE',
          },
        )
          .then(handleErrors)
          .then(() => {
            dispatch(notifySuccess('Item was deleted.'));
            return dispatch(deleteItem(id));
          })
          .catch(() => {
            dispatch(registerAction(action));
            return dispatch(notifyError('Item failed to delete.'));
          });

        return action();
      };

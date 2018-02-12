import { IListItem } from '../../models/interfaces/IListItem';
import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

export const saveNewTextFactory =
  ({
     fetch,
     saveItemChanges,
     notifySuccess,
     notifyError,
     registerAction,
     handleErrors,
   }: {
    fetch: IFetch,
    saveItemChanges: (id: Guid, text: string) => IAction,
    notifySuccess: (message: string) => IAction,
    notifyError: (message: string) => IAction,
    registerAction: (action: () => void) => IAction,
    handleErrors: (response: Response) => Response,
  }) =>
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
          .then(handleErrors)
          .then(() => {
            dispatch(notifySuccess('Item text was updated.'));
            return dispatch(saveItemChanges(item.id, text));
          })
          .catch(() => {
            dispatch(registerAction(action));
            return dispatch(notifyError('Item failed to update.'));
          });

        return action();
      };

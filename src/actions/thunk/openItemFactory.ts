import { IListItem } from '../../models/interfaces/IListItem';
import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

export const openItemFactory =
  ({
     fetch,
     openItemForEditing,
     notifyError,
     registerAction,
     handleErrors,
   }: {
    fetch: IFetch,
    openItemForEditing: (id: Guid) => IAction,
    notifyError: (message: string) => IAction,
    registerAction: (action: () => void) => IAction,
    handleErrors: (response: Response) => Response,
  }) =>
    (uri: string, item: IListItem) =>
      (dispatch: Dispatch<IAction>) => {
        const { id } = item;
        const updatedItem = {
          isBeingEdited: true,
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
          .then(() => dispatch(openItemForEditing(id)))
          .catch(() => dispatch(notifyError('Item failed to open.')));

        dispatch(registerAction(action));

        return action();
      };

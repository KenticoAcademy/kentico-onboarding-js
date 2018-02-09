import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

export const postItemFactory =
  ({
     fetch,
     addNewItem,
     notifySuccess,
     notifyError,
     registerAction,
     handleErrors,
   }: {
    fetch: IFetch,
    addNewItem: (item: IListItem) => IAction,
    notifySuccess: (message: string) => IAction,
    notifyError: (message: string) => IAction,
    registerAction: (action: () => void) => IAction,
    handleErrors: (response: Response) => Response,
  }) =>
    (uri: string, text: string) =>
      (dispatch: Dispatch<IAction>) => {
        const newItem = {
          isBeingEdited: false,
          text,
        };

        const action = () => fetch(
          uri,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
          }
        )
          .then(handleErrors)
          .then((res: Response) => res.json())
          .then((returnedItem: IListItem) => {
            dispatch(notifySuccess('Item was created.'));
            dispatch(addNewItem(returnedItem));
          })
          .catch(() => dispatch(notifyError('Item failed to create.')));

        dispatch(registerAction(action));

        return action();
      };

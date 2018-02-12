import { IListItem } from '../../models/interfaces/IListItem';
import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

export const changeItemOpenStateFactory =
  ({
     fetch,
     changeItemOpenState,
     notifyError,
     registerAction,
     handleErrors,
   }: {
    fetch: IFetch,
    changeItemOpenState: (id: Guid, isBeingEdited: boolean) => IAction,
    notifyError: (message: string) => IAction,
    registerAction: (action: () => void) => IAction,
    handleErrors: (response: Response) => Response,
  }) =>
    (uri: string,
     item: IListItem) =>
      (dispatch: Dispatch<IAction>) => {
        const { id, isBeingEdited } = item;

        const updatedItem = {
          isBeingEdited: !isBeingEdited,
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
          .then(() => dispatch(changeItemOpenState(id, !isBeingEdited)))
          .catch(() => {
            dispatch(registerAction(action));
            dispatch(notifyError('Item failed to change open state.'));
          });

        return action();
      };

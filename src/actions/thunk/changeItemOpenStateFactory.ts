import { IListItem } from '../../models/interfaces/IListItem';
import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

interface IItemOpenStateFactoryDependencies {
  readonly fetch: IFetch;
  readonly changeItemOpenState: (id: Guid, isBeingEdited: boolean) => IAction;
  readonly notifyError: (message: string) => IAction;
  readonly registerAction: (action: () => void) => IAction;
  readonly handleErrors: (response: Response) => Response;
}

export const changeItemOpenStateFactory = (deps: IItemOpenStateFactoryDependencies) =>
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
          .then(deps.handleErrors)
          .then(() => dispatch(deps.changeItemOpenState(id, !isBeingEdited)))
          .catch(() => {
            dispatch(deps.registerAction(action));
            return dispatch(deps.notifyError('Item failed to change open state.'));
          });

        return action();
      };

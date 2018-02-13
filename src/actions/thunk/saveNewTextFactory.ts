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
  readonly handleErrors: (response: Response) => Response;
}

export interface ISaveNewTextActionParams {
  readonly uri: string;
  readonly item: IListItem;
  readonly text: string;
}

export const saveNewTextFactory = (deps: ISaveNewTextFactoryDependencies) =>
  ({ uri, item: { id }, text }: ISaveNewTextActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const updatedItem = {
        text,
        isBeingEdited: false,
        id,
      };

      return deps.fetch(
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
          return dispatch(deps.saveItemChanges(id, text));
        })
        .catch(() => dispatch(deps.notifyError('Item failed to update.')));
    };

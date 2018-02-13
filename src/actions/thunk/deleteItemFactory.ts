import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

interface IDeleteItemFactoryDependencies {
  readonly fetch: IFetch;
  readonly deleteItem: (id: Guid) => IAction;
  readonly handleErrors: (response: Response) => Response;
}

export interface IDeleteItemActionParams {
  readonly uri: string;
  readonly id: Guid;
}

export const deleteItemFactory = (deps: IDeleteItemFactoryDependencies) =>
  ({ uri, id }: IDeleteItemActionParams) =>
    (dispatch: Dispatch<IAction>) => deps.fetch(
      uri + id,
      {
        method: 'DELETE',
      },
    )
      .then(deps.handleErrors)
      .then(() => dispatch(deps.deleteItem(id)));

import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';

interface IEditItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly saveItemChangesRequest: (id: Guid, text: string) => IAction;
  readonly saveItemChangesConfirm: (id: Guid) => IAction;
  readonly saveItemChangesFailed: (id: Guid) => IAction;
}

export interface IEditItemActionParams {
  readonly id: Guid;
  readonly text: string;
}

export const editItemFactory = (dependencies: IEditItemFactoryDependencies) =>
  ({ id, text }: IEditItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const updatedItem = {
        text,
        isBeingEdited: false,
        id,
      };

      dispatch(dependencies.saveItemChangesRequest(id, text));

      return dependencies.httpClient.patch(dependencies.uri + id, updatedItem)
        .then(() => dispatch(dependencies.saveItemChangesConfirm(id)))
        .catch(() => dispatch(dependencies.saveItemChangesFailed(id)));
    };

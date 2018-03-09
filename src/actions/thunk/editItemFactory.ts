import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IUpdatedItem } from '../../models/interfaces/IUpdatedItem';

interface IEditItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly saveItemChangesRequest: (item: IUpdatedItem) => IAction;
  readonly saveItemChangesConfirm: (id: Guid) => IAction;
  readonly saveItemChangesFailed: (id: Guid) => IAction;
}

export interface IEditItemActionParams {
  readonly id: Guid;
  readonly text: string;
  readonly syncedText: string;
}

export const editItemFactory = (dependencies: IEditItemFactoryDependencies) =>
  ({ id, text, syncedText }: IEditItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const updatedItem: IUpdatedItem = {
        id,
        text,
        syncedText,
      };
      dispatch(dependencies.saveItemChangesRequest(updatedItem));

      return dependencies.httpClient.put(dependencies.uri + id, {
        id,
        text,
      })
        .then(() => dispatch(dependencies.saveItemChangesConfirm(id)))
        .catch(() => dispatch(dependencies.saveItemChangesFailed(id)));
    };

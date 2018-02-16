import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';

interface ISaveNewTextFactoryDependencies {
  readonly httpClient: IHttpClient;
  readonly saveItemChanges: (id: Guid, text: string) => IAction;
}

export interface ISaveNewTextActionParams {
  readonly uri: string;
  readonly id: Guid;
  readonly text: string;
}

export const saveNewTextFactory = (deps: ISaveNewTextFactoryDependencies) =>
  ({ uri, id, text }: ISaveNewTextActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const updatedItem = {
        text,
        isBeingEdited: false,
        id,
      };

      return deps.httpClient.patch(uri + id, updatedItem)
        .then(() => dispatch(deps.saveItemChanges(id, text)));
    };

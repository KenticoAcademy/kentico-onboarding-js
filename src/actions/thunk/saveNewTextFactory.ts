import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

interface ISaveNewTextFactoryDependencies {
  readonly fetch: IFetch;
  readonly saveItemChanges: (id: Guid, text: string) => IAction;
  readonly handleErrors: (response: Response) => Response;
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
        .then(() => dispatch(deps.saveItemChanges(id, text)));
    };

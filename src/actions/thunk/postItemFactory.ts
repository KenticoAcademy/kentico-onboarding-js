import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IFetch } from '../../models/interfaces/IFetch';

interface IPostItemFactoryDependencies {
  readonly fetch: IFetch;
  readonly addNewItem: (item: IListItem) => IAction;
  readonly handleErrors: (response: Response) => Response;
}

export interface IPostItemActionParams {
  readonly uri: string;
  readonly text: string;
}

export const postItemFactory = (deps: IPostItemFactoryDependencies) =>
  ({ uri, text }: IPostItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const newItem = {
        isBeingEdited: false,
        text,
      };

      return deps.fetch(
        uri,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        }
      )
        .then(deps.handleErrors)
        .then((res: Response) => res.json())
        .then((returnedItem: IListItem) => dispatch(deps.addNewItem(returnedItem)));
    };

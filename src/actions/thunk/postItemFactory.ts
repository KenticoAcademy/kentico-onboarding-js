import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';

interface IPostItemFactoryDependencies {
  readonly httpClient: IHttpClient;
  readonly addNewItem: (item: IListItem) => IAction;
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

      return deps.httpClient.post(uri, newItem)
        .then((returnedItem: IListItem) => dispatch(deps.addNewItem(returnedItem)));
    };

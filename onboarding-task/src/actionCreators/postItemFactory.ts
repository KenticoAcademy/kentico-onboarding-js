import { IAction } from './IAction';
import { IItemData } from '../models/IItem';
import { checkStatus } from './checkStatus';

interface IPostItemsFactoryDependencies {
  success: (json: object, oldId: string) => IAction;
  error: (id: string, error: Error) => IAction;
  itemAdd: (text: string) => IAction;
  post: (body: Partial<IItemData>) => Promise<ResponseWithJson>;
}

export const postItemFactory = (dependencies: IPostItemsFactoryDependencies) => (text: string) => ((dispatch: Dispatch): Promise<IAction> => {
    const clientId = dispatch(dependencies.itemAdd(text)).payload.id;
    return dependencies.post({ text })
      .then(checkStatus)
      .then(response => response.json())
      .then(item => dispatch(dependencies.success(item, clientId)))
      .catch((error: Error) => dispatch(dependencies.error(clientId, error)));
  }
);

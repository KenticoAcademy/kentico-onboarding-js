import { IAppState } from '../store/state/IAppState';

export const getErrorMessage = (state: IAppState, id: Guid): string => {
  const errorId: Guid = state.list.items.get(id).errorId;
  return errorId === ''
    ? ''
    : state
      .list
      .itemErrors
      .get(errorId)
      .message;
};

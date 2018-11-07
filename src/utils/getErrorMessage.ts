import { IAppState } from '../store/state/IAppState';

export const getErrorMessage = (state: IAppState, id: Guid): string | null => {
  const errorId: Guid = state.list.items.get(id).errorId;
  return errorId === ''
    ? null
    : state
      .list
      .itemErrors
      .get(errorId)
      .message;
};

import { IAction } from '../../@types/IAction';

export const dataLoaded = (state = false, action: IAction): boolean => {
  switch (action.type) {
    default:
      return state;
  }
};

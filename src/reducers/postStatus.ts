import { ITEM_POST_ERROR, ITEM_POST_SUCCESS } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';
import { PostStatus } from '../models/PostStatus';

export const postStatus = (previousState: PostStatus = new PostStatus(), action: IAction): PostStatus => {
  switch (action.type) {
    case ITEM_POST_ERROR: {
      const updatedStatus = {
        hasError: true,
        errorMessage: action.payload.errorText
      };

      return previousState.with(updatedStatus);
    }
    case ITEM_POST_SUCCESS: {
      const updatedStatus = {
        hasError: false
      };

      return previousState.with(updatedStatus);
    }

    default:
      return previousState;
  }
};

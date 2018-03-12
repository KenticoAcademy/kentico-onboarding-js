import { CLOSE_POST_ERROR, POST_ITEM_ERROR, POST_ITEM_SUCCESS } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';
import { PostStatus } from '../models/PostStatus';

export const postStatus = (previousState: PostStatus = new PostStatus(), action: IAction): PostStatus => {
  switch (action.type) {
    case POST_ITEM_ERROR: {
      const updatedStatus = {
        hasError: true,
        errorMessage: action.payload.errorMessage
      };

      return previousState.with(updatedStatus);
    }
    case CLOSE_POST_ERROR:
    case POST_ITEM_SUCCESS: {
      const updatedStatus = {
        hasError: false
      };

      return previousState.with(updatedStatus);
    }

    default:
      return previousState;
  }
};

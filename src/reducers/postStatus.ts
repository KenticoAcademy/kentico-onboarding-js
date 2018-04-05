import { ITEM_INSERT_ERROR_CLOSE, ITEM_INSERT_FAILED, ITEM_INSERT_SUCCEEDED } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';
import { PostStatus } from '../models/PostStatus';

export const postStatus = (previousState: PostStatus = new PostStatus(), action: IAction): PostStatus => {
  switch (action.type) {
    case ITEM_INSERT_FAILED: {
      const updatedStatus = {
        hasError: true,
        message: action.payload.message
      };

      return previousState.with(updatedStatus);
    }
    case ITEM_INSERT_ERROR_CLOSE:
    case ITEM_INSERT_SUCCEEDED: {
      const updatedStatus = {
        hasError: false
      };

      return previousState.with(updatedStatus);
    }

    default:
      return previousState;
  }
};

import { OrderedMap } from 'immutable';
import { IListAction } from '../../actions/types/IListAction';
import { BackupTextsState } from '../../store/types/BackupTextsState';
import {
  CLOSE_SAVE_ERROR,
  ITEM_SAVE_STARTED,
  ITEM_SAVE_SUCCEEDED,
} from '../../actions/types/listActionTypes';

export const backupTexts = (state: BackupTextsState = OrderedMap<Uuid, string>(), action: IListAction): BackupTextsState => {
  switch (action.type) {
    case ITEM_SAVE_STARTED:
        return state.set(action.payload.id, action.payload.backupText);

    case ITEM_SAVE_SUCCEEDED:
    case CLOSE_SAVE_ERROR:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

import {
  ITEM_EDIT_CONFIRM,
  ITEM_EDIT_CANCEL,
  ITEM_DELETE,
} from '../constants/constants';

const editKeys = {
  [ITEM_EDIT_CANCEL]: 'escape',
  [ITEM_EDIT_CONFIRM]: 'enter',
  [ITEM_DELETE]: 'del',
};

export const keymap = {
  NewItem: editKeys,
  ListItemEditor: editKeys,
};

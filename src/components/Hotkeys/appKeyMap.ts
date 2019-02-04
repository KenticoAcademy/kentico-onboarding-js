import { KeySequence } from 'react-hotkeys';

type HotkeyAction = 'confirm' | 'cancelEditing' | 'deleteItem';

export type AppKeyMap = {
  [key in HotkeyAction]: KeySequence;
};

export type HotkeyHandler = {
  [key in HotkeyAction]: (keyEvent?: KeyboardEvent) => void;
};

export const appKeyMap: AppKeyMap = {
  confirm: 'enter',
  cancelEditing: 'escape',
  deleteItem: 'ctrl+del',
};

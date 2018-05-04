type Keys = 'enter' | 'esc';

export interface IKeyMap {
  readonly saveChanges: Keys;
  readonly cancelEditing: Keys;
}

export type KeyMapHandlers = {
  [P in keyof IKeyMap]: Function
};

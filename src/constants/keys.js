export const keyActions = {
  OnEnter: 'onEnter',
  OnEsc: 'onEsc',
};

const defaultKeyMap = {
  [keyActions.OnEnter]: 'enter',
  [keyActions.OnEsc]: 'esc',
};

export const keyMap = Object.freeze(defaultKeyMap);

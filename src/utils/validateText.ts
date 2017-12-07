export const validateText = (inputText: string): boolean =>
  (!!inputText && !!inputText.match(/\w/));

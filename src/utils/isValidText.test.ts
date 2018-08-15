import {isValidText} from './isValidText';

describe('isValidText', () => {
  [
    '     ',
    '',
    '  \n',
    '\f\n\r\t\v'
  ].forEach(text =>
    it(`returns false for ${text}`, () => {
      const result = isValidText(text);

      expect(result).toBeFalsy();
    })
  );

  [
    '     aaaaa',
    '   aaa   aa   ',
    'aaa   ',
    'aaaa'
  ].forEach(text =>
    it(`returns true for ${text}`, () => {
      const result = isValidText(text);

      expect(result).toBeTruthy();
    })
  );

});


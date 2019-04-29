import { isTextEmpty } from './isTextEmpty';

describe('isTextEmpty', () => {
  [
    '     ',
    '',
    '  \n',
    '\f\n\r\t\v'
  ].forEach(text =>
    it(`returns false for ${text}`, () => {
      const result = isTextEmpty(text);

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
      const result = isTextEmpty(text);

      expect(result).toBeTruthy();
    })
  );

});


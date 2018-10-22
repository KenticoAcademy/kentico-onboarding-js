import { isTextValid } from './isTextValid';

describe('isTextValid()', () => {
  [
    '',
    '  ',
    null,
    undefined,
    true,
    42,
  ].forEach((input) => {
    it(`should return false for input "${input}"`, () => {
      expect(isTextValid(input)).toBeFalsy();
    });
  });

  it('should return true in case of valid input', () => {
    const input = 'hello';

    const result = isTextValid(input);

    expect(result).toBeTruthy();
  });
});

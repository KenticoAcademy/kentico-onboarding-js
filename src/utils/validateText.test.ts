import {
  validateText,
} from './validateText';

describe('validateText', () => {
  it('returns true for non-empty string', () => {
    const validString = 'asdfasf';

    const isStringValid = validateText(validString);

    expect(isStringValid).toEqual(true);
  });

  it('returns false for empty string', () => {
    const emptyString = '';

    const isStringValid = validateText(emptyString);

    expect(isStringValid).toBe(false);
  });

  it('returns false for string with whitespaces only', () => {
    const invalidString = '          ';

    const isStringValid = validateText(invalidString);

    expect(isStringValid).toBe(false);
  });

  it('returns false for string with extra whitespaces', () => {
    const invalidString = '  ebebe   ';

    const isStringValid = validateText(invalidString);

    expect(isStringValid).toBe(false);
  });
});

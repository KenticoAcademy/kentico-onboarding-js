import { isInputValid } from './validationService.ts';

describe('Input is validated correctly', () => {
  it('return true if not null', () => {
    const input = 'test input';
    expect(isInputValid(input)).toBe(true);
  });

  it('return false if null', () => {
    const input = null;
    expect(isInputValid(input)).toBe(false);
  });

  it('return false if undefined', () => {
    expect(isInputValid(undefined)).toBe(false);
  });
});

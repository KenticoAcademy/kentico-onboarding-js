import { validateInput } from './inputValidator';

describe('validateInput()', () => {

  it('should return false in case of empty input', () => {
    const input = '';
    const result = validateInput(input);
    expect(result).toBeFalsy();
  });

  it('should return false in case of input with multiple whitespaces', () => {
    const input = '    '
    const result = validateInput(input);
    expect(result).toBeFalsy();
  });

  it('should return true in case of valid input', () => {
    const input = 'hello';
    const result = validateInput(input);
    expect(result).toBeTruthy();
  });
});

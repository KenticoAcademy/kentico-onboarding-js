import { validateInput } from './inputValidator';

describe('Input validator', () => {


  it('empty string should return false', () => {
    const input = '';
    const result = validateInput(input);
    expect(result).toBeFalsy();
  });

  it('multiple whitespaces should return false', () => {
    const input = '    '
    const result = validateInput(input);
    expect(result).toBeFalsy();
  });


  it('valid input should return true', () => {
    const input = 'hello';
    const result = validateInput(input);
    expect(result).toBeTruthy();
  });
});

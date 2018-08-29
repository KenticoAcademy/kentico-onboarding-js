import { validateInput } from './inputValidator';

describe('Input validator', () => {


  it('empty string should return false', () => {
    const input = '';
    expect(validateInput(input)).toBeFalsy();
  });

  it('multiple whitespaces should return false', () => {
    const input = '    ';
    expect(validateInput(input)).toBeFalsy();
  });


  it('valid input should return true', () => {
    const input = 'hello';
    expect(validateInput(input)).toBeTruthy();
  });
});

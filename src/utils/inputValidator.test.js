import { validateInput } from './inputValidator';

describe('Input validator', () => {


  it('empty string should return false', () => {
    let input = '';
    expect(validateInput(input)).toBeFalsy();
  });

  it('multiple whitespaces should return false', () => {
    let input = '    ';
    expect(validateInput(input)).toBeFalsy();
  });


  it('valid input should return true', () => {
    let input = 'ahoj';
    expect(validateInput(input)).toBeTruthy();
  });
});

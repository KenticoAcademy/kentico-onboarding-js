import { isTextValid } from './isTextValid';

describe('isTextValid()', () => {
  it('should return false in case of empty input', () => {
    const input = '';

    const result = isTextValid(input);

    expect(result).toBeFalsy();
  });

  it('should return false in case of input with multiple whitespaces', () => {
    const input = '    ';

    const result = isTextValid(input);

    expect(result).toBeFalsy();
  });

  it('should return false in case the input is null', () => {
    const input = null;

    const result = isTextValid(input);

    expect(result).toBeFalsy();
  });

  it('should return false in case the input is undefined', () => {
    const input = undefined;

    const result = isTextValid(input);

    expect(result).toBeFalsy();
  });

  it('should return true in case of valid input', () => {
    const input = 'hello';

    const result = isTextValid(input);

    expect(result).toBeTruthy();
  });
});

import { isTextEmpty } from '../../src/utils/validation';

describe('isTextEmpty', () => {
  it('will return false when text is not empty', () => {
    const text = 'something';

    const result = isTextEmpty(text);

    expect(result)
      .toBeFalsy();
  });

  ['', null, undefined]
    .map(text =>
      it(`will return true when text is ${text}`, () => {
        const result = isTextEmpty(text);

        expect(result)
          .toBeTruthy();
      }));
});

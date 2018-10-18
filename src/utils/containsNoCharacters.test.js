import {containsNoCharacters} from './containsNoCharacters.ts';


describe('containsNoCharacters', () => {
  it('returns true when the text is empty', () => {
    const emptyText = '';

    const result = containsNoCharacters(emptyText);

    expect(result).toBe(true);
  });

  it('returns true when the text is null', () => {
    const emptyText = null;

    const result = containsNoCharacters(emptyText);

    expect(result).toBe(true);
  });

  it('returns true when the text is undefined', () => {
    const emptyText = undefined;

    const result = containsNoCharacters(emptyText);

    expect(result).toBe(true);
  });

  it('returns false when the text is not empty', () => {
    const text = 'something';

    const result = containsNoCharacters(text);

    expect(result).toBe(false);
  });

  it('returns true when the text is just a space', () => {
    const text = ' ';

    const result = containsNoCharacters(text);

    expect(result).toBe(true);
  });
});

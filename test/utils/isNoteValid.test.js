import { isNoteValid } from '../../src/utils/isNoteValid.ts';

describe('Note validator tests', () => {
  it('returns true for valid note', () => {
    const validNote = 'Valid Note';

    const validationResult = isNoteValid(validNote);

    expect(validationResult).toBeTruthy();
  });

  it('returns false for empty note', () => {
    const invalidNote = '';

    const validationResult = isNoteValid(invalidNote);

    expect(validationResult).toBeFalsy();
  });

  it('returns false if string consisting of spaces is inserted', () => {
    const invalidNote = ' ';

    const validationResult = isNoteValid(invalidNote);

    expect(validationResult).toBeFalsy();
  });
});

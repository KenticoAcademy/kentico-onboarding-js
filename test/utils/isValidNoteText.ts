import { isValidNoteText } from '../../src/utils/isValidNoteText';

describe('IsValidNoteText', () => {
  it('should return true for valid note.', () => {
    const validNote = 'Valid Note';

    const validationResult = isValidNoteText(validNote);

    expect(validationResult).toBeTruthy();
  });

  ['', ' ', null, undefined]
    .forEach(invalidNote =>
      it(`should return false for "${invalidNote}"`, () => {
        const validationResult = isValidNoteText(invalidNote);

        expect(validationResult).toBeTruthy();
      }));
});

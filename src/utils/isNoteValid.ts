export const isNoteValid = (currentNoteText: string): boolean =>
  !!currentNoteText && currentNoteText.trim().length > 0;

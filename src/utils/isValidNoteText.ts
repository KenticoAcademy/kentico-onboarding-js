export const isValidNoteText = (currentNoteText: string | undefined | null): boolean =>
  !!currentNoteText && currentNoteText.trim().length > 0;

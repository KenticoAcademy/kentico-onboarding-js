import { generateId } from '../../src/utils/generateId.ts';

describe('ID generator', () => {
  it('returns id matching conditions for uuid4', () => {
    const uidRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    const actualUid = generateId();

    expect(uidRegex.test(actualUid)).toBeTruthy();
  });

  it('returns different id in every call', () => {
    const firstUid = generateId();
    const secondUid = generateId();

    expect(firstUid).not.toEqual(secondUid);
  });
});

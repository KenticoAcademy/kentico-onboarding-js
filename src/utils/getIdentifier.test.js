import { getIdentifier } from './getIdentifier.ts';

describe('UUID Generator works correctly', () => {
  it('has GUID format v4', () => {
    const regular = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
    const uuid = getIdentifier();
    expect(uuid.match(regular) !== null).toBe(true);
  });

  it('generates 100 random uuid', () => {
    const uuids = Array.apply(null, Array(100)).map(() => getIdentifier());
    const filteredSet = new Set(uuids);
    expect(uuids.length === filteredSet.size).toBe(true);
  });
});

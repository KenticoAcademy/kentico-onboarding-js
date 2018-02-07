import { uuidv4 } from '../src/utils/UUIDGenerator';

describe('UUID Generator works correctly', () => {
  it('generates 100 random uuid', () => {
    const uuids = Array.apply(null, Array(100)).map(() => uuidv4());
    const filteredSet = new Set(uuids);
    expect(uuids.length === filteredSet.size).toBe(true);
  });
});

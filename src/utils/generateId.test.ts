import { generateId, Uuid } from './generateId';

describe('Generate id', () => {
  it('generates unique id', () => {
    const guid1: Uuid = generateId();
    const guid2: Uuid = generateId();

    expect(guid1).not.toEqual(guid2);
  });

  it('returns valid guid string', () => {
    const guid: Uuid = generateId();

    expect(guid).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
  });
});

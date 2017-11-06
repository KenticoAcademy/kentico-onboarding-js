import { generateId } from '../../src/utils/generateId';

describe('Generate id', () => {
  it('generates unique id', () => {
    const guid1 = generateId();
    const guid2 = generateId();

    expect(guid1).not.toEqual(guid2);
  });

  it('returns valid guid string', () => {
    const guid = generateId();

    expect(guid).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
  });
});

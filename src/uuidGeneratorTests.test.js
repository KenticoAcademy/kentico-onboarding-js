import { uuidGenerator } from './utils/uuidGenerator';

describe('UuidGenerator', () => {
  it('control the length of UUID', () => {
    const id = uuidGenerator();
    expect(id.length).toBe(36);
  });

  it('control the number of the "-" in the UUID', () => {
    const id = uuidGenerator();
    expect(id.split('-').length).toBe(5);
  });

  it('control uniqueness of UUIDs', () => {
    const id1 = uuidGenerator();
    const id2 = uuidGenerator();
    expect(id1.localeCompare(id2) !== 0).toBeTruthy();
  });
});

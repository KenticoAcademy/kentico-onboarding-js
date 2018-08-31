import { generateId } from './generateId';

describe('generateId', () => {
  it('control the length of UUID', () => {
    const id = generateId();
    expect(id.length).toBe(36);
  });

  it('control the number of the "-" in the UUID', () => {
    const id = generateId();
    expect(id.split('-').length).toBe(5);
  });

  it('control uniqueness of UUIDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1.localeCompare(id2) !== 0).toBeTruthy();
  });
});

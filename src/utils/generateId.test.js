import { generateId } from './generateId';

describe('generateId', () => {
  it('control UUID on correction with regex', () => {
    const regex = new RegExp('[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}', 'i');

    const id = generateId();

    expect(regex.test(id)).toBeTruthy();
  });

  it('control uniqueness of UUIDs', () => {
    const id1 = generateId();
    const id2 = generateId();

    expect(id1.localeCompare(id2) !== 0).toBeTruthy();
  });
});

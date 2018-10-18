import {generateId} from './generateId.ts';


describe('generateId', () => {
  it('generates ID in uuid format correctly', () => {
    const uuidFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const id = generateId();

    expect(id).toMatch(uuidFormat);
  });

  it('generates different IDs when called twice', () => {
    const id1 = generateId();
    const id2 = generateId();

    expect(id1).not.toBe(id2);
  });
});

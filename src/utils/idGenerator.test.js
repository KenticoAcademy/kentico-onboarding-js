import { generateId } from './idGenerator';

describe('Id generator', () => {
  const validFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  it('should generate id in valid format', () => {
    const id = generateId();

    expect(id).toMatch(validFormat);
  });

  it('should generate different ids', () => {
    const firstId = generateId();
    const secondId = generateId();

    expect(firstId).not.toBe(secondId);
  });
});

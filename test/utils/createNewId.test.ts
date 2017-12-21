import { createNewId } from '../../src/utils/createNewId';

describe('createNewId', () => {
  it('will create unique id when called 2 times', () => {
    const firstId = createNewId();
    const secondId = createNewId();

    expect(firstId)
      .not
      .toEqual(secondId);
  });

  it('will generate correct GUID specified in RFC4122', () => {
    const guidStructure = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    const guid = createNewId();

    expect(guid)
      .toMatch(guidStructure);
  });
});

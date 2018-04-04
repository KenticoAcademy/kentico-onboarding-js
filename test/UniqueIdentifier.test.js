import { UniqueIdentifier } from '../src/utils/UniqueIdentifier.jsx';

describe('Generator of random identifiers works correctly', () => {
  it('Fulfills GUID format', () => {
    const regularExp = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
    const newUuid = UniqueIdentifier.generateUniqueId();
    expect(regularExp.test(newUuid)).toBe(true);
  });

  it('Generates 50 random GUIDs', () => {
    const generatedGuids = Array.from(Array(50), () => UniqueIdentifier.generateUniqueId());
    const filteredArray = generatedGuids.filter((value, index, self) => self.indexOf(value) === index);
    expect(generatedGuids.length === filteredArray.length).toBe(true);
  });
});

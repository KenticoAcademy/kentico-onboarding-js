import { guid } from './guid';

const getRegexOfVersion = (version: number) => RegExp('[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-' + version + '[a-fA-F0-9]{3}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}');

describe('guid', () => {
  it('meets version 4 of the standard', () => {
    const testedGuid = guid();

    expect(testedGuid).toMatch(getRegexOfVersion(4));
  });

  it('is unique', () => {
    const guidArray = Array(20).fill(undefined).map(() => guid());
    const guidSet = new Set(guidArray);

    expect(guidArray.length).toEqual(guidSet.size);
  });
});


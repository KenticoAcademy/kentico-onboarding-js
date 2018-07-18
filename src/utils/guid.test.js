import { guid } from './guid';

const regex = RegExp(/^[a-fA-F0-9]{8}-([a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12}$/);

describe('guid', () => {
  it('matches regex', () => {
    const testedGuid = guid();

    expect(testedGuid)
      .toMatch(regex);
  });

  it('is unique', () => {
    const guidArray = Array(20).fill(undefined).map(() => guid());
    const guidSet = new Set(guidArray);

    expect(guidArray.length)
      .toEqual(guidSet.size);
  });
});


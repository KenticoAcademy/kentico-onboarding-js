import { guid } from './guid';
const uuidv3 = require('uuid/v3');
const uuidv1 = require('uuid/v1');

const regex = RegExp(/^[a-fA-F0-9]{8}-([a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12}$/);

const regexVersion = (version) => {
  return RegExp('[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-' + version + '[a-fA-F0-9]{3}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}');
}

describe('guid', () => {
  it('matches regex', () => {
    const testedGuid = guid();

    expect(testedGuid).toMatch(regex);
  });

  it('is version 1', () => {
    const testedGuid = uuidv1();

    expect(testedGuid).toMatch(regexVersion(1));
  });

  it('is version 3', () => {
    const testedGuid = uuidv3('hello.example.com', uuidv3.DNS);

    expect(testedGuid).toMatch(regexVersion(3));
  });

  it('is version 4', () => {
    const testedGuid = guid();

    expect(testedGuid).toMatch(regexVersion(4));
  });

  it('is unique', () => {
    const guidArray = Array(20).fill(undefined).map(() => guid());
    const guidSet = new Set(guidArray);

    expect(guidArray.length).toEqual(guidSet.size);
  });
});


import { generateItems } from '../../src/utils/generateItems';
import { OrderedMap } from 'immutable';
import { generateList } from '../../src/utils/initItemList';
import * as Guid from 'guid';

describe('generate items', () => {
  it('returns ordered map', () => {
    const maybeOrderedMap = generateItems();

    expect(OrderedMap.isOrderedMap(maybeOrderedMap)).toBe(true);
  });

  it('returns ordered map with size of initItemList', () => {
    const orderedMap = generateItems();

    expect(orderedMap.size).toEqual(generateList().length);
  });

  it('returns ordered map where keys are guids', () => {
    const orderedMap = generateItems();

    orderedMap.keySeq().forEach((element) => {
      expect(Guid.isGuid(element)).toBe(true);
    });
  });

  it('returns ordered map where values are items', () => {
    const orderedMap = generateItems();
    const itemTexts = generateList();

    orderedMap.valueSeq().forEach((element) => {
      expect(typeof(element)).toEqual(typeof({}));
      expect(element.isEdited).toBe(false);
      expect(Guid.isGuid(element.id)).toBe(true);
      expect(itemTexts).toContain(element.text);
    });
  });
});

import {
  defaultItem,
  IItem,
} from '../models/Item';
import {selectItemMemoized} from './selectItemMemoized';

describe('selectItemMemoized', () => {
  it('return the same object when is given two different objects with the same value', () => {
    const firstArr: IItem = defaultItem;
    const secondArr: IItem = defaultItem;

    expect(selectItemMemoized(firstArr)).toBe(selectItemMemoized(secondArr));
  });

  it('return different object when is given two different objects with different values', () => {
    const firstArr: IItem = defaultItem;
    const secondArr: IItem = {textUpdate: "tadyda" , ...defaultItem} ;

    expect(selectItemMemoized(firstArr)).not.toBe(selectItemMemoized(secondArr));
  });
});

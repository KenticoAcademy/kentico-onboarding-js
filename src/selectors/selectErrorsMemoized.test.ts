import { Map } from 'immutable';
import {selectErrorsMemoized} from './selectErrorsMemoized';


describe('selectErrorsMemoized', () => {
  it('return the same object when is given two different objects with the same value', () => {
    const firstArr =  Map<string,string>({"someStringKey": "someStringValue"});
    const secondArr = Map<string,string>({"someStringKey": "someStringValue"});

    expect(selectErrorsMemoized(firstArr)).toBe(selectErrorsMemoized(secondArr));
  });

  it('return different object when is given two different objects with different values', () => {
    const firstArr =  Map<string,string>({"someStringKey": "someStringValue"});
    const secondArr = Map<string,string>({"someStringKey": "someStringValueThatIsNotTheSame"});

    expect(selectErrorsMemoized(firstArr)).not.toBe(selectErrorsMemoized(secondArr));
  });
});

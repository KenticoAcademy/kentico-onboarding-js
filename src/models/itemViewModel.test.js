import { createMemoizedViewModel } from '../models/itemViewModel';
import { Item } from './item';

describe('ViewModel is memoized correctly', () => {
  it('createMemoizedViewModel returns memoized item', () => {
    const predefinedValues = new Item({
      value: 'Test',
      temporaryValue: 'Test',
    });
    const model1 = createMemoizedViewModel(predefinedValues, '1');
    const model2 = createMemoizedViewModel(predefinedValues, '1');

    expect(model1).toBe(model2);
  });
});

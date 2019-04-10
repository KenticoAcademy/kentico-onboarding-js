import { closeSaveError, saveItem, saveItemSuccess } from '../../actions/listActionCreators';
import { backupTexts } from './backupTexts';
import { OrderedMap } from 'immutable';

describe('Save started action should add text to state', () => {
  const itemId = '00000000-0000-0000-0000-000000000001';
  const backupText = 'backupText';
  const text = 'text';
  const nonemptyState = OrderedMap<Uuid, string>().set(itemId, backupText);
  const actionsWhichRemoveText = [
    saveItemSuccess(itemId),
    closeSaveError(itemId, backupText),
  ];

  it('should add error to state', () => {
    const saveFail = saveItem(itemId, text, backupText);

    const result = backupTexts(undefined, saveFail);

    expect(result).toEqual(nonemptyState);
  });

  actionsWhichRemoveText.forEach(action =>
    it('Save succeeded, close save error should remove text from state', () => {
      const expectedResult = OrderedMap<Uuid, string>();

      const result = backupTexts(nonemptyState, action);

      expect(result).toEqual(expectedResult);
    }));
});

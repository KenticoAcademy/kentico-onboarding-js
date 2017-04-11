import { deleteItem, enableEditItem, saveChangesToItem, cancelChangesToItem } from '../../src/actionCreators/actionCreators.js';
import { addItemFactory } from '../../src/actionCreators/addItemFactory';
import { ADD_ITEM, DELETE_ITEM, ENABLE_EDIT_ITEM, SAVE_CHANGES_TO_ITEM, CANCEL_CHANGES_TO_ITEM } from '../../src/constants/actionTypes.js';

describe('Correctly creates actions', () => {
  const fakeId = '07b2b519-e303-1bbf-8ba7-9b986a0d15fc';
  const generateFakeId = () => '11111111-e303-1bbf-8ba7-9b986a0d15fc';
  const text = 'test text';

  it('Action to add an item', () => {
    const expectedAction = { type: ADD_ITEM, payload: { id: generateFakeId(), text } };

    const testedAction = addItemFactory(generateFakeId)(text);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to delete an item', () => {
    const expectedAction = { type: DELETE_ITEM, payload: { id: fakeId } };

    const testedAction = deleteItem(fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to edit an item', () => {
    const expectedAction = { type: ENABLE_EDIT_ITEM, payload: { id: fakeId } };

    const testedAction = enableEditItem(fakeId);

    expect(testedAction).toEqual(expectedAction);
  });

  it('Action to save the changes done to an item', () => {
    const expectedAction = { type: SAVE_CHANGES_TO_ITEM, payload: { id: fakeId, text } };

    const testedAction = saveChangesToItem(fakeId, text);

    expect(expectedAction).toEqual(testedAction);
  });

  it('Action to delete the changes done to an item', () => {
    const expectedAction = { type: CANCEL_CHANGES_TO_ITEM, payload: { id: fakeId } };

    const testedAction = cancelChangesToItem(fakeId);

    expect(expectedAction).toEqual(testedAction);
  });
});

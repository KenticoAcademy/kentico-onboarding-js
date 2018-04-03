import { editItemFactory } from '../../../src/actions/thunk/editItemFactory';
import {
  getDispatchedActionTypes,
  httpClientFailure,
  httpClientSuccessFactory,
} from './thunkTestsUtils';
import { defaultUuid } from '../../../src/constants/defaultUuid';
import { IUpdatedItem } from '../../../src/models/interfaces/IUpdatedItem';
import {
  ITEM_SYNC_FAILED,
  SAVE_ITEM_CHANGES_CONFIRM,
  SAVE_ITEM_CHANGES_REQUEST,
} from '../../../src/constants/actionTypes';

const actionParams: IUpdatedItem = {
  id: defaultUuid,
  text: '',
  syncedText: '',
};
const uri = '';

describe('editItemAsync will call dispatch with', () => {
  it('saveItemChangesRequest and saveItemChangesConfirm actions', () => {
    const expectedActionTypes = [
      SAVE_ITEM_CHANGES_REQUEST,
      SAVE_ITEM_CHANGES_CONFIRM,
    ];
    const httpClient = httpClientSuccessFactory();
    const saveNewText = editItemFactory({
      uri,
      httpClient,
    });
    const dispatch = jest.fn();

    return saveNewText(actionParams)(dispatch)
      .then(() => {
        const callArguments = getDispatchedActionTypes(dispatch);

        expect(callArguments)
          .toEqual(expectedActionTypes);
      });
  });

  it('saveItemChangesRequest and saveItemChangesFailed actions', () => {
    const expectedActionTypes = [
      SAVE_ITEM_CHANGES_REQUEST,
      ITEM_SYNC_FAILED,
    ];
    const httpClient = httpClientFailure;
    const saveNewText = editItemFactory({
      uri,
      httpClient,
    });
    const dispatch = jest.fn();

    return saveNewText(actionParams)(dispatch)
      .then(() => {
        const callArguments = getDispatchedActionTypes(dispatch);

        expect(callArguments)
          .toEqual(expectedActionTypes);
      });
  });
});

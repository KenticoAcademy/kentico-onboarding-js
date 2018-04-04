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
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_START,
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
      ITEM_UPDATE_START,
      ITEM_UPDATE_SUCCESS,
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
      ITEM_UPDATE_START,
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

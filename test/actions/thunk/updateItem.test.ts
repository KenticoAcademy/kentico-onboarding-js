import { updateItemFactory } from '../../../src/actions/thunk/updateItemFactory';
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

describe('updateItem', () => {
  describe('successful request will dispatch', () => {
    it('requestItemUpdate and confirmItemUpdate actions', () => {
      const expectedActionTypes = [
        ITEM_UPDATE_START,
        ITEM_UPDATE_SUCCESS,
      ];
      const httpClient = httpClientSuccessFactory();
      const saveNewText = updateItemFactory({
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

  describe('failed request will dispatch', () => {
    it('requestItemUpdate and saveItemChangesFailed actions', () => {
      const expectedActionTypes = [
        ITEM_UPDATE_START,
        ITEM_SYNC_FAILED,
      ];
      const httpClient = httpClientFailure;
      const saveNewText = updateItemFactory({
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
});

import { putNoteFactory } from '../../../src/actions/thunkFactories/putNoteFactory';
import {
  mockServerNote,
  mockStoreState,
} from '../../testUtils/mocks';
import {
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS,
} from '../../../src/constants/actionTypes';
import { Promise } from 'es6-promise';

const BEFORE_UPDATE_TEXT = 'before update test';
const UPDATED_TEXT = 'test updated text';
const UPDATED_NOTE_ID = '1';

describe('putNoteFactory tests', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

  it('should correctly update note on server.', () => {
    const sendRequest = () => Promise.resolve(mockServerNote(BEFORE_UPDATE_TEXT, UPDATED_NOTE_ID));
    const configurationObject = { sendRequest };

    return putNoteFactory(configurationObject)({ text: UPDATED_TEXT, id: UPDATED_NOTE_ID })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_UPDATING_NOTE_ON_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(UPDATING_NOTE_ON_SERVER_SUCCESS);
      });
  });

  it('should fail while updating note to server.', () => {
    const configurationObject = { sendRequest: () => Promise.reject({}) };

    return putNoteFactory(configurationObject)({ text: UPDATED_TEXT, id: UPDATED_NOTE_ID })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_UPDATING_NOTE_ON_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(UPDATING_NOTE_ON_SERVER_FAILURE);
      });
  });
});

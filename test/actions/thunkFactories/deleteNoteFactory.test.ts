import { Promise } from 'es6-promise';
import { deleteNoteFactory } from '../../../src/actions/thunkFactories/deleteNoteFactory';
import {
  mockServerNote,
  mockStoreState
} from '../../testUtils/mocks';
import {
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER
} from '../../../src/constants/actionTypes';

const NOTE_TO_DELETE_ID = '1';

describe('DeleteNoteFactory ', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

  it('should correctly delete note from server.', () => {
    const sendRequest = () => Promise.resolve(mockServerNote('test', NOTE_TO_DELETE_ID));
    const configurationObject = { sendRequest };

    return deleteNoteFactory(configurationObject)(NOTE_TO_DELETE_ID)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_DELETING_NOTE_FROM_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(DELETING_NOTE_FROM_SERVER_SUCCESS);
      });
  });

  it('should fail while deleting note from server.', () => {
    const configurationObject = { sendRequest: () => Promise.reject({}) };

    return deleteNoteFactory(configurationObject)(NOTE_TO_DELETE_ID)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_DELETING_NOTE_FROM_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(DELETING_NOTE_FROM_SERVER_FAILURE);
      });
  });
});

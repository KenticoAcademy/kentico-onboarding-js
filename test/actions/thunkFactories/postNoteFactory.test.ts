import {
  postNoteFactory,
  repostNoteFactory
} from '../../../src/actions/thunkFactories/postNoteFactory';
import {
  mockServerNote,
  mockStoreState,
} from '../../testUtils/mocks';
import {
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_RESENDING_NOTE_TO_SERVER,
  START_SENDING_NOTE_TO_SERVER
} from '../../../src/constants/actionTypes';
import { Promise } from 'es6-promise';

const NOTE_TO_ADD_TEXT = 'test added text';
const NOTE_ID = '1';

describe('PostNoteFactory ', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

  it('should correctly add note to server.', () => {
    const sendRequest = () => Promise.resolve(mockServerNote(NOTE_TO_ADD_TEXT, NOTE_ID));
    const configurationObject = { sendRequest };

    return postNoteFactory(configurationObject)({ text: NOTE_TO_ADD_TEXT })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_SENDING_NOTE_TO_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(SENDING_NOTE_TO_SERVER_SUCCESS);
      });
  });

  it('should fail while adding note to server.', () => {
    const configurationObject = { sendRequest: () => Promise.reject({}) };

    return postNoteFactory(configurationObject)({ text: NOTE_TO_ADD_TEXT })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_SENDING_NOTE_TO_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(SENDING_NOTE_TO_SERVER_FAILURE);
      });
  });
});

describe('RepostNoteFactory ', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

  it('should correctly add note to server.', () => {
    const sendRequest = () => Promise.resolve(mockServerNote(NOTE_TO_ADD_TEXT, NOTE_ID));
    const configurationObject = { sendRequest };

    return repostNoteFactory(configurationObject)({ text: NOTE_TO_ADD_TEXT }, NOTE_ID)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_RESENDING_NOTE_TO_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(SENDING_NOTE_TO_SERVER_SUCCESS);
      });
  });

  it('should fail while adding note to server.', () => {
    const configurationObject = { sendRequest: () => Promise.reject({}) };

    return repostNoteFactory(configurationObject)({ text: NOTE_TO_ADD_TEXT }, NOTE_ID)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_RESENDING_NOTE_TO_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(SENDING_NOTE_TO_SERVER_FAILURE);
      });
  });
});

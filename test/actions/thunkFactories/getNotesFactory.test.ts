import { Promise } from 'es6-promise';
import { getNotesFactory } from '../../../src/actions/thunkFactories/getNotesFactory';
import {
  mockServerNote,
  mockStoreState,
} from '../../testUtils/mocks';
import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES
} from '../../../src/constants/actionTypes';

describe('GetNotesFactory ', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

  it('should correctly load notes from server.', () => {
    const sendRequest = () => Promise.resolve([mockServerNote('first', '1'), mockServerNote('second', '2')]);
    const configurationObject = { sendRequest };

    return getNotesFactory(configurationObject)()(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_LOADING_NOTES);
        expect(dispatch.mock.calls[1][0].type).toEqual(LOADING_NOTES_SUCCESS);
      });
  });

  it('should fail while loading notes from server.', () => {
    const configurationObject = { sendRequest: () => Promise.reject({}) };

    return getNotesFactory(configurationObject)()(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_LOADING_NOTES);
        expect(dispatch.mock.calls[1][0].type).toEqual(LOADING_NOTES_FAILURE);
      });
  });
});

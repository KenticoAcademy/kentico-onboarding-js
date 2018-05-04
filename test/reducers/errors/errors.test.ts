import { OrderedMap } from 'immutable';
import { ApplicationError } from '../../../src/models/ApplicationError';
import { errors } from '../../../src/reducers/errors/errors';
import { updateFailedFactory } from '../../../src/actions/thunkFactories/putNoteFactory';
import { FailedAction } from '../../../src/enums/FailedAction';
import { deleteFailureFactory } from '../../../src/actions/thunkFactories/deleteNoteFactory';
import { sendingNoteFailedFactory } from '../../../src/actions/thunkFactories/postNoteFactory';
import {
  cancelFailedAddAction,
  cancelFailedDeleteAction,
  cancelFailedUpdateAction
} from '../../../src/actions';
import {
  loadingFailedFactory,
  startLoadingNotes
} from '../../../src/actions/thunkFactories/getNotesFactory';

describe('Reducer errors ', () => {
  let initialState: OrderedMap<Guid, ApplicationError>;

  beforeEach(() => {
    initialState = OrderedMap<Guid, ApplicationError>();
  });

  it('should working correctly with undefined state.', () => {
    const updateNoteFailureAction = updateFailedFactory(() => 'error1')('1', 'Test error');
    const expectedState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.UPDATE,
          errorDescription: 'Test error'
        })
      ],
    ]);

    const actualState = errors(undefined, updateNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should return previous state if unknown action is dispatched.', () => {
    const unknownAction = {
      type: 'Test action',
    };

    const actualState = errors(initialState, unknownAction);

    expect(actualState).toEqual(initialState);
  });

  it('should add error caused by DELETE when DELETING_NOTE_FROM_SERVER_FAILURE is dispatched.', () => {
    const deleteNoteFailureAction = deleteFailureFactory(() => 'error1')('1', 'Test error');
    const expectedState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.DELETE,
          errorDescription: 'Test error'
        })
      ],
    ]);

    const actualState = errors(initialState, deleteNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should add error caused by UPDATE when UPDATING_NOTE_ON_SERVER_FAILURE is dispatched.', () => {
    const updateNoteFailureAction = updateFailedFactory(() => 'error1')('1', 'Test error');
    const expectedState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.UPDATE,
          errorDescription: 'Test error'
        })
      ],
    ]);

    const actualState = errors(initialState, updateNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should add error caused by ADD when SENDING_NOTE_TO_SERVER_FAILURE is dispatched.', () => {
    const sendingNoteFailureAction = sendingNoteFailedFactory(() => 'error1')('1', 'Test error');
    const expectedState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.ADD,
          errorDescription: 'Test error'
        })
      ],
    ]);

    const actualState = errors(initialState, sendingNoteFailureAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should add error caused by GET when LOADING_NOTES_FAILURE is dispatched.', () => {
    const loadingFailedAction = loadingFailedFactory(() => 'error1')('Test error');
    const expectedState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.GET,
          errorDescription: 'Test error'
        })
      ],
    ]);

    const actualState = errors(initialState, loadingFailedAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should remove error with id from payload when CANCEL_FAILED_DELETE_ACTION is dispatched.', () => {
    const deleteNoteFailureCancelAction = cancelFailedDeleteAction('1', 'error1');
    initialState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.DELETE,
          errorDescription: 'Test error'
        })
      ],
    ]);
    const expectedState = OrderedMap<Guid, ApplicationError>();

    const actualState = errors(initialState, deleteNoteFailureCancelAction);

    expect(actualState).toEqual(expectedState);
  });


  it('should remove error with id from payload when CANCEL_FAILED_ADD_ACTION is dispatched.', () => {
    const addNoteFailureCancelAction = cancelFailedAddAction('1', 'error1');
    initialState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.ADD,
          errorDescription: 'Test error'
        })
      ],
    ]);
    const expectedState = OrderedMap<Guid, ApplicationError>();

    const actualState = errors(initialState, addNoteFailureCancelAction);

    expect(actualState).toEqual(expectedState);
  });


  it('should remove error with id from payload when CANCEL_FAILED_UPDATE_ACTION is dispatched.', () => {
    const updateNoteFailureCancelAction = cancelFailedUpdateAction('1', 'error1', 'serverSynchronizedText');
    initialState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.UPDATE,
          errorDescription: 'Test error'
        })
      ],
    ]);
    const expectedState = OrderedMap<Guid, ApplicationError>();

    const actualState = errors(initialState, updateNoteFailureCancelAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should remove error with id from payload when START_LOADING_NOTES is dispatched.', () => {
    const startLoadingAction = startLoadingNotes('error1');
    initialState = OrderedMap<Guid, ApplicationError>([
      [
        'error1',
        new ApplicationError({
          id: 'error1',
          failedAction: FailedAction.GET,
          errorDescription: 'Test error'
        })
      ],
    ]);
    const expectedState = OrderedMap<Guid, ApplicationError>();

    const actualState = errors(initialState, startLoadingAction);

    expect(actualState).toEqual(expectedState);
  });
});

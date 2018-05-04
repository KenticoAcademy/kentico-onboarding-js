import { Dispatch } from 'redux';
import { IServerNote } from '../../models/Note';
import { IStoreState } from '../../reducers/IStoreState';
import { IAction } from '../IAction';
import {
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER,
} from '../../constants/actionTypes';
import { generateLocalId } from '../../utils/generateLocalId';
import { SOMETHING_WENT_WRONG } from '../../constants/errorMessages';

export interface IDeleteNoteDependencies {
  sendRequest: (id: Guid) => Promise<IServerNote>;
}

export const startDeletingNoteFromServer = (noteId: Guid): IAction => ({
  type: START_DELETING_NOTE_FROM_SERVER,
  payload: {
    noteId,
  }
});

export const deleteFailureFactory = (generateErrorId: () => Guid) => (noteId: Guid, errorDescription: string): IAction => ({
  type: DELETING_NOTE_FROM_SERVER_FAILURE,
  payload: {
    errorDescription,
    noteId,
    errorId: generateErrorId(),
  }
});

export const deletingNoteFromServerFailed = (noteId: Guid, errorDescription: string) =>
  deleteFailureFactory(generateLocalId)(noteId, errorDescription);

export const deletingNoteFromServerSuccess = (noteId: Guid): IAction => ({
  type: DELETING_NOTE_FROM_SERVER_SUCCESS,
  payload: {
    noteId,
  }
});

export const deleteNoteFactory = (dependencies: IDeleteNoteDependencies) =>
  (noteId: Guid): Thunk =>
    (dispatch: Dispatch<IStoreState>): Promise<IAction> => {
      dispatch(startDeletingNoteFromServer(noteId));

      return dependencies
        .sendRequest(noteId)
        .then(deletedNote => dispatch(deletingNoteFromServerSuccess(deletedNote.id)))
        .catch(() => dispatch(deletingNoteFromServerFailed(noteId, SOMETHING_WENT_WRONG)));
    };

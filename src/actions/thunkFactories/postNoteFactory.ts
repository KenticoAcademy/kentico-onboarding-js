import { Dispatch } from 'redux';
import { convertNote } from '../../utils/noteConverter';
import { IAction } from '../IAction';
import {
  Note,
  IServerNote
} from '../../models/Note';
import { IStoreState } from '../../reducers/IStoreState';
import {
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_RESENDING_NOTE_TO_SERVER,
  START_SENDING_NOTE_TO_SERVER
} from '../../constants/actionTypes';
import { generateLocalId } from '../../utils/generateLocalId';
import { SOMETHING_WENT_WRONG } from '../../constants/errorMessages';

export interface IPostNote {
  text: string;
}

export interface IPostNoteDependencies {
  sendRequest: (data: IPostNote) => Promise<IServerNote>;
}

export const startReSendingNoteToServer = (localNoteId: Guid) => ({
  type: START_RESENDING_NOTE_TO_SERVER,
  payload: {
    localNoteId,
  }
});

export const startSendingNoteToServer = (noteId: Guid, text: string): IAction => ({
  type: START_SENDING_NOTE_TO_SERVER,
  payload: {
    noteId,
    text,
    isCommunicating: true,
  }
});

export const sendingNoteFailedFactory = (generateErrorId: () => Guid) => (noteId: Guid, errorDescription: string): IAction => ({
  type: SENDING_NOTE_TO_SERVER_FAILURE,
  payload: {
    noteId,
    errorDescription,
    errorId: generateErrorId(),
  }
});

export const sendingNoteToServerFailed = (noteId: Guid, errorDescription: string) =>
  sendingNoteFailedFactory(generateLocalId)(noteId, errorDescription);

export const sendingNoteToServerSuccess = (addedNote: Note, localNoteId: Guid): IAction => ({
  type: SENDING_NOTE_TO_SERVER_SUCCESS,
  payload: {
    text: addedNote.visibleText,
    noteId: addedNote.id,
    isCommunicating: false,
    localNoteId,
  }
});

export const postNoteFactory = (dependencies: IPostNoteDependencies) =>
  (data: IPostNote): Thunk =>
    (dispatch: Dispatch<IStoreState>): Promise<IAction> => {
      const localId = generateLocalId();

      dispatch(startSendingNoteToServer(localId, data.text));

      return dependencies
        .sendRequest(data)
        .then(addedNote => {
          const applicationNote = convertNote(addedNote);

          return dispatch(sendingNoteToServerSuccess(applicationNote, localId));
        })
        .catch(() => dispatch(sendingNoteToServerFailed(localId, SOMETHING_WENT_WRONG)));
    };

export const repostNoteFactory = (dependencies: IPostNoteDependencies) =>
  (data: IPostNote, localId: Guid): Thunk =>
    (dispatch: Dispatch<IStoreState>): Promise<IAction> => {
      dispatch(startReSendingNoteToServer(localId));

      return dependencies
        .sendRequest(data)
        .then(addedNote => {
          const applicationNote = convertNote(addedNote);

          return dispatch(sendingNoteToServerSuccess(applicationNote, localId));
        })
        .catch(() => dispatch(sendingNoteToServerFailed(localId, SOMETHING_WENT_WRONG)));
    };

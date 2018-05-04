import { Dispatch } from 'redux';
import {
  Note,
  IServerNote
} from '../../models/Note';
import { IAction } from '../IAction';
import { IStoreState } from '../../reducers/IStoreState';
import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES
} from '../../constants/actionTypes';
import { convertNotes } from '../../utils/noteConverter';
import { generateLocalId } from '../../utils/generateLocalId';
import { SOMETHING_WENT_WRONG } from '../../constants/errorMessages';

export interface IGetNotesDependencies {
  sendRequest: () => Promise<IServerNote[]>;
}

export const startLoadingNotes = (errorId?: Guid): IAction => ({
  type: START_LOADING_NOTES,
  payload: {
    errorId,
  }
});

export const storeLoadedNotes = (notes: Iterable<[Guid, Note]>): IAction => ({
  type: LOADING_NOTES_SUCCESS,
  payload: {
    notes,
  },
});

export const loadingFailedFactory = (generateErrorId: () => Guid) => (errorDescription: string): IAction => ({
  type: LOADING_NOTES_FAILURE,
  payload: {
    errorDescription,
    errorId: generateErrorId(),
  },
});

export const displayError = (errorDescription: string) =>
  loadingFailedFactory(generateLocalId)(errorDescription);

export const getNotesFactory = (dependencies: IGetNotesDependencies) => (errorId?: Guid): Thunk =>
  (dispatch: Dispatch<IStoreState>): Promise<IAction> => {
    dispatch(startLoadingNotes(errorId));

    return dependencies
      .sendRequest()
      .then(serverNotes => {
          const applicationNotes = convertNotes(serverNotes);

          return dispatch(storeLoadedNotes(applicationNotes));
        }
      )
      .catch(() => dispatch(displayError(SOMETHING_WENT_WRONG)));
  };

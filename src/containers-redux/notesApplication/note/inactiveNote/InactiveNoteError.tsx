import {
  connect,
  Dispatch
} from 'react-redux';
import { IStoreState } from '../../../../reducers/IStoreState';
import {
  InactiveNoteError as IInactiveNoteErrorComponent,
  IInactiveNoteErrorCallbackProps,
  IInactiveNoteErrorDataProps,
} from '../../../../components/notesApplication/note/inactiveNote/InactiveNoteError';
import { getFailedActionCallbacks } from '../../../../utils/getFailedActionCallbacks';
import { getErrorById } from '../../../../selectors/errors/getErrorById';
import { FailedAction } from '../../../../enums/FailedAction';
import { Note } from '../../../../models/Note';

interface IInactiveNoteErrorOwnProps {
  readonly note: Note;
  readonly number: number;
}

const mapStateToProps = ({ errors }: IStoreState, ownProps: IInactiveNoteErrorOwnProps): IInactiveNoteErrorDataProps => {
  return {
    number: ownProps.number,
    note: ownProps.note,
    error: getErrorById(errors, ownProps.note.errorId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>, ownProps: IInactiveNoteErrorOwnProps): IInactiveNoteErrorCallbackProps => {
  return {
    retryFailedAction: (failedAction: FailedAction) =>
      dispatch(getFailedActionCallbacks(failedAction).retryFailedAction(ownProps.note.id, ownProps.note.visibleText)),

    cancelFailedAction: (failedAction: FailedAction, errorId: Guid) =>
      dispatch(getFailedActionCallbacks(failedAction).cancelFailedAction(ownProps.note.id, errorId, ownProps.note.serverSynchronizedText)),

    getFailedActionTooltipText: (failedAction: FailedAction) =>
      getFailedActionCallbacks(failedAction).getFailedActionTooltipText(),
  };
};

export const InactiveNoteError = connect(
  mapStateToProps,
  mapDispatchToProps
)(IInactiveNoteErrorComponent);

import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  MdError,
  MdRepeat,
  MdCancel,
} from 'react-icons/lib/md';
import { NotePropType } from '../../../../utils/notePropType';
import { IAction } from '../../../../actions/IAction';
import { FailedAction } from '../../../../enums/FailedAction';
import { ApplicationError } from '../../../../models/ApplicationError';
import { Note } from '../../../../models/Note';

export interface IInactiveNoteErrorDataProps {
  readonly note: Note;
  readonly number: number;
  readonly error: ApplicationError;
}

export interface IInactiveNoteErrorCallbackProps {
  readonly retryFailedAction: (failedAction: FailedAction) => Promise<IAction> | undefined;
  readonly cancelFailedAction: (failedAction: FailedAction, errorId: Guid) => IAction | undefined;
  readonly getFailedActionTooltipText: (failedAction: FailedAction) => string;
}

type InactiveNoteErrorProps = IInactiveNoteErrorDataProps & IInactiveNoteErrorCallbackProps;

export class InactiveNoteError extends React.PureComponent<InactiveNoteErrorProps, {}> {
  static displayName = 'InactiveNoteError';

  static propTypes = {
    note: NotePropType,
    number: PropTypes.number.isRequired,
  };

  constructor(props: InactiveNoteErrorProps) {
    super(props);
  }

  _onRetryClick = (): Promise<IAction> | undefined =>
    this.props.retryFailedAction(this.props.error.failedAction);

  _onCancelFailedActionClick = (): IAction | undefined =>
    this.props.cancelFailedAction(this.props.error.failedAction, this.props.error.id);

  render() {
    return (
      <p>
        <span style={{ color: 'grey' }}>{this.props.number + '. ' + this.props.note.visibleText}</span>
        <span title={'Cancel failed ' + this.props.getFailedActionTooltipText(this.props.error.failedAction)}>
          <MdCancel
            className="pull-right"
            size="25"
            color="blue"
            style={{ cursor: 'pointer' }}
            onClick={this._onCancelFailedActionClick}
          />
        </span>
        <span title={'Retry ' + this.props.getFailedActionTooltipText(this.props.error.failedAction)}>
          <MdRepeat
            className="pull-right"
            color="green"
            size="25"
            style={{ cursor: 'pointer' }}
            onClick={this._onRetryClick}
          />
        </span>
        <span title="Error">
          <MdError
            className="pull-right"
            size="25"
            color="red"
          />
        </span>
        <span
          className="pull-right"
          style={{ color: 'red' }}
        >
          {this.props.error.errorDescription}
        </span>
      </p>
    );
  }
}

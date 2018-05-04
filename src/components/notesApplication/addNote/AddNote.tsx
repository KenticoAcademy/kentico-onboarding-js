import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isValidNoteText } from '../../../utils/isValidNoteText';
import { IAction } from '../../../actions/IAction';
import { NoteErrorMessage } from '../note/NoteErrorMessage';
import { NonEmptyInput } from '../../input/NonEmptyInput';

export interface IAddNoteDataProps {
  readonly isInputFocused: boolean;
  readonly text: string;
}

export interface IAddNoteCallbacksProps {
  readonly onAddClick: (text: string) => Promise<IAction>;
  readonly updateInsertedText: (insertedText: string) => void;
  readonly onInputFocus: () => IAction;
  readonly onInputBlur: () => IAction;
}

type AddNoteProps = IAddNoteDataProps & IAddNoteCallbacksProps;

export class AddNote extends React.PureComponent<AddNoteProps> {
  static displayName = 'AddNote';

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
    updateInsertedText: PropTypes.func.isRequired,
    onInputFocus: PropTypes.func.isRequired,
    onInputBlur: PropTypes.func.isRequired,
    isInputFocused: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  };

  private errorMessage = 'Invalid note. You cannot add an empty note to list of notes.';

  _addInsertedText = (): Promise<IAction> =>
    this.props.onAddClick(this.props.text);

  render(): JSX.Element {
    const isNoteTextValid = isValidNoteText(this.props.text);
    const isError = !isNoteTextValid && this.props.isInputFocused;

    return (
      <div>
        <div className="input-group">
          <NonEmptyInput
            enableAutoFocus={false}
            inputClassName="form-control"
            isError={isError}
            {...this.props}
          />
          <div className="input-group-btn">
            <button
              type="button"
              disabled={!isNoteTextValid}
              className="btn btn-default"
              onClick={this._addInsertedText}
            >
              Add
            </button>
          </div>
        </div>
        <NoteErrorMessage
          isError={isError}
          errorMessage={this.errorMessage}
        />
      </div>
    );
  }
}

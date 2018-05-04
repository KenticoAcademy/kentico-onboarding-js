import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormEvent } from 'react';
import * as classNames from 'classnames';
import { IAction } from '../../actions/IAction';
import { HotKeysHandler } from '../applicationKeys/HotKeysHandler';
import { KeyMapHandlers } from '../../models/IKeyMap';

export interface INonEmptyInputDataProps {
  readonly text: string;
  readonly isError: boolean;
  readonly inputClassName: string;
  readonly enableAutoFocus: boolean;
}

export interface INonEmptyInputCallbacksProps {
  readonly updateInsertedText: (insertedText: string) => void;
  readonly onAddClick: (newText?: string) => void;
  readonly onInputFocus?: () => IAction;
  readonly onInputBlur?: () => IAction;
  readonly onCancelEditing?: () => void;
}

type NonEmptyInputProps = INonEmptyInputDataProps & INonEmptyInputCallbacksProps;

export class NonEmptyInput extends React.PureComponent<NonEmptyInputProps> {
  static displayName = 'NonEmptyInput';

  static propTypes = {
    text: PropTypes.string.isRequired,
    updateInsertedText: PropTypes.func.isRequired,
    onAddClick: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    inputClassName: PropTypes.string.isRequired,
    enableAutoFocus: PropTypes.bool.isRequired,
    onInputFocus: PropTypes.func,
    onInputBlur: PropTypes.func,
    onCancelEditing: PropTypes.func,
  };

  private textInput: HTMLInputElement;

  componentDidMount(): void {
    if (this.props.enableAutoFocus) {
      const length = this.textInput.value.length;
      this.textInput.focus();
      this.textInput.setSelectionRange(length, length);
    }
  }

  _onInputFocus = (): void => {
    if (this.props.onInputFocus) {
      this.props.onInputFocus();
    }
  };

  _onExitingInput = (): void => {
    if (this.props.onInputBlur) {
      this.props.onInputBlur();
    }
  };

  _onInputChange = (event: FormEvent<HTMLInputElement>): void =>
    this.props.updateInsertedText(event.currentTarget.value);

  _onCancelFocusOfInput = (): void => {
    if (this.props.onCancelEditing) {
      this.props.onCancelEditing();
    } else {
      this.textInput.blur();
    }
  };

  _onSaveChanges = (): void => {
    if (!this.props.isError) {
      this.textInput.blur();
      this.props.onAddClick(this.props.text);
    }
  };

  render(): JSX.Element {
    const handlers: KeyMapHandlers = {
      'cancelEditing': this._onCancelFocusOfInput,
      'saveChanges': this._onSaveChanges,
    };

    const inputErrorCssClass = classNames({
      'has-error': this.props.isError,
    });

    return (
      <div className={inputErrorCssClass}>
        <HotKeysHandler handlers={handlers}>
          <input
            type="text"
            ref={(input: HTMLInputElement) => {
              this.textInput = input;
            }}
            className={this.props.inputClassName}
            onChange={this._onInputChange}
            value={this.props.text}
            onFocus={this._onInputFocus}
            onBlur={this._onExitingInput}
          />
        </HotKeysHandler>
      </div>
    );
  }
}


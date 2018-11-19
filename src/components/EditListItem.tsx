import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import classNames from 'classnames';
import { isStringNonempty } from '../utils/isStringNonempty';
import { HotKeys } from 'react-hotkeys';

export type EditListItemContainerProps = {
  readonly id: Guid,
  readonly order: number,
};

export type EditListItemDispatchProps = {
  readonly save: (text: string) => void,
  readonly delete: () => void,
  readonly cancel: () => void,
};

export type EditListItemStateProps = {
  readonly text: string,
};

type EditListItemProps = EditListItemDispatchProps & EditListItemStateProps & EditListItemContainerProps;

type EditListItemState = {
  readonly inputText: string,
};

export class EditListItem extends PureComponent<EditListItemProps, EditListItemState> {
  static displayName: string = 'EditListItem';

  static propTypes: ValidationMap<EditListItemProps> = {
    order: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    save: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  state: EditListItemState = {
    inputText: this.props.text,
  };

  private _storeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    this.setState(() => ({ inputText: value }));
  };

  private _saveNewItemText = () => {
    const { inputText } = this.state;
    if (isStringNonempty(inputText)) {
      this.props.save(inputText);
    }
  };

  private _onKeyPress = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  render(): JSX.Element {
    const isValid: boolean = isStringNonempty(this.state.inputText);
    const title: string | undefined = isValid
      ? undefined
      : 'Please enter text';
    const className: string = classNames('input-group stretch', {
      'has-success': isValid,
      'has-error': !isValid,
    });
    const handlers = {
      'cancelEditing': this.props.cancel,
      'deleteItem': this.props.delete,
      'confirm': this._saveNewItemText,
    };

    return (
      <HotKeys handlers={handlers}>
        <form className="flexbox" onKeyPress={this._onKeyPress}>
          <section className={className}>
            <div className="stretch">
              <input
                type="text"
                className="form-control"
                value={this.state.inputText}
                onChange={this._storeInputValue}
                tabIndex={this.props.order}
                autoFocus={true}
              />
            </div>
            <div className="input-group-btn normal">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this._saveNewItemText}
                disabled={!isValid}
                title={title}
                tabIndex={-1}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.props.cancel}
                tabIndex={-1}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.props.delete}
                tabIndex={-1}
              >
                Delete
              </button>
            </div>
          </section>
        </form>
      </HotKeys>
    );
  }
}

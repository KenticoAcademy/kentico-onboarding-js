import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

export interface IEditItemOwnProps {
  readonly id: Guid;
  readonly position: number;
}

export interface IEditItemStateProps {
  readonly text: string;
}

export interface IEditItemDispatchProps {
  readonly onSave: (text: string) => void;
  readonly onDelete: () => void;
  readonly onCancel: () => void;
}

type IEditItemProps = IEditItemOwnProps & IEditItemStateProps & IEditItemDispatchProps;

export class EditItem extends React.PureComponent<IEditItemProps, IEditItemStateProps> {
  static displayName = 'EditItem';

  static propTypes: PropTypes.ValidationMap<IEditItemProps> = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.text,
  };

  private _textEdit = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ text: eventTargetValue }));
  };

  private _saveItem = (): void => this.props.onSave(this.state.text);

  private _deleteItem = (): void => this.props.onDelete();

  private _handleSaveItemOnEnter = (event: KeyboardEvent): void => {
    event.preventDefault();
    if (this.state.text.length > 0) {
      this._saveItem();
    }
  };

  private _handleDeleteItemOnShortCut = (event: KeyboardEvent): void => {
    event.preventDefault();
    this.props.onDelete();
  };

  render(): JSX.Element {
    const handlers: { [key: string]: (keyEvent?: KeyboardEvent) => void } = {
      'exit': this.props.onCancel,
      'enter': this._handleSaveItemOnEnter,
      'delete': this._handleDeleteItemOnShortCut,
    };

    return (
      <form className="form-inline">
        <div className="form-group">
          {this.props.position + '. '}
          <div className="input-group">
            <HotKeys handlers={handlers}>
              <input
                type="text"
                className="form-control"
                id="text"
                value={this.state.text}
                onChange={this._textEdit}
                autoFocus={true}
              />
            </HotKeys>
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this._saveItem}
                disabled={!this.state.text}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={this.props.onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this._deleteItem}
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      </form>
    );
  }
}

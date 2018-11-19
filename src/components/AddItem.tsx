import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IAddItemProps {
  readonly onAddItem: (input: string) => void;
}

interface IAddItemState {
  readonly inputText: string;
}

export class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItem';

  static propTypes: PropTypes.ValidationMap<IAddItemProps> = {
    onAddItem: PropTypes.func.isRequired,
  };

  state = {
    inputText: '',
  };

  private _updateValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ inputText: eventTargetValue }));
  };

  private _addItem = (): void => {
    this.props.onAddItem(this.state.inputText);
    this.setState(() => ({ inputText: '' }));
  };

  render(): JSX.Element {
    return (
      <form className="form-inline">
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="text"
              value={this.state.inputText}
              onChange={this._updateValue}
              autoFocus={true}
            />
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-default"
                onClick={this._addItem}
                disabled={!this.state.inputText}
              >
                Add
              </button>
            </span>
          </div>
        </div>
      </form>
    );
  }
}

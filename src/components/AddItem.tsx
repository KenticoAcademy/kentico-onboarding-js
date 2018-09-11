import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';

export interface IAddItemProps {
  readonly onChange: (input: string) => void;
}

interface IAddItemState {
  readonly inputText: string;
}

export class AddItem extends PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItem';

  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  state = {
    inputText: '',
  };

  private _updateValue = (event: React.FormEvent<HTMLInputElement>): void => {
    const eventTargetValue = event.currentTarget.value;
    this.setState(() => ({ inputText: eventTargetValue }));
  };

  private _addItem = (): void => {
    this.props.onChange(this.state.inputText);
    this.setState(() => ({ inputText: '' }));
  };

  render(): JSX.Element {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="text"
            value={this.state.inputText}
            onChange={this._updateValue}
          />
          <button
            type="button"
            className="btn btn-default"
            onClick={this._addItem}
            disabled={!this.state.inputText}
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

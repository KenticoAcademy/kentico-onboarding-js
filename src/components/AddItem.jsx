import React, { PureComponent } from 'react';

export class AddItem extends PureComponent {
  static displayName = 'AddItem';

  state = {
    inputText: '',
  };

  _updateValue = event => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ inputText: eventTargetValue }));
  };

  _addItem = () => {
    this.props.onChange(this.state.inputText);
    this.setState(() => ({ inputText: '' }));
  };

  render() {
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

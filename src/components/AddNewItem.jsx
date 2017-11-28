import React, { PureComponent } from 'react';
import { checkEmptiness } from '../utils/checkEmptiness';
import PropTypes from 'prop-types';

export class AddNewItem extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    const newText = e.target.value;
    this.setState({
      input: newText,
    });
  };

  onClick = () => {
    const input = this.state.input;
    this.props.onAdd(input);
    this.setState({
      input: '',
    });
  };

  render() {
    const input = this.state.input;
    const isEmpty = checkEmptiness(input);

    return (
      <div className="list-group-item form-inline">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            onChange={this.onChange}
            value={input}
            placeholder="Type new item name..."
          />
          <div className="input-group-btn">
            <button
              data-balloon={isEmpty ? "Item name mustn't be empty" : null}
              data-balloon-pos="up"
              className="btn btn-default"
              disabled={isEmpty}
              onClick={this.onClick}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

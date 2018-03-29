import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { enableUniqueIds } from 'react-html-id';

export class ListItemEditor extends PureComponent {
  static displayName = 'ListItemEditor';

  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };

    enableUniqueIds(this);
  }

  _changeItemText = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  _saveItem = (e) => {
    e.preventDefault();
    this.props.onChange(this.props.id, this.state.text);
  };

  _deleteItem = (e) => {
    e.preventDefault();
    this.props.onDelete(this.props.id);
  };

  _cancelItemEdit = (e) => {
    e.preventDefault();
    this.props.onCancel();
  };

  render() {
    return (
      <span className="form-group">
        <label htmlFor={this.nextUniqueId()} />
        <input
          type="text"
          className="form-control"
          id={this.lastUniqueId()}
          value={this.state.text}
          onChange={this._changeItemText}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={this._saveItem}
        >Save
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={this._cancelItemEdit}
        >Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this._deleteItem}
        >Delete
        </button>
      </span>
    );
  }
}


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { enableUniqueIds } from 'react-html-id';

export class CreateListItem extends PureComponent {
  static displayName = 'CreateListItem';

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newItemText: '',
    };

    enableUniqueIds(this);
  }

  _updateItemText = (e) => {
    this.setState({
      newItemText: e.target.value,
    });
  };

  _submitItemText = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.newItemText);

    this.setState({
      newItemText: '',
    });
  };

  render() {
    return (
      <li className="list-group-item">
        <span className="form-group">
          <label htmlFor={this.nextUniqueId()} />
          <input type="text" className="form-control" id={this.lastUniqueId()} value={this.state.newItemText} onChange={this._updateItemText} />
          <button type="button" className="btn btn-secondary" onClick={this._submitItemText}>Add</button>
        </span>
      </li>
    );
  }
}

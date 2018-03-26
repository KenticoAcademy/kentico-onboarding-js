import React, { PureComponent } from 'react';

export class CreateListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newItemText: '',
    };
  }

  _inputChange = (e) => {
    this.setState({
      newItemText: e.target.value,
    });
  };

  _inputSubmit = (e) => {
    e.preventDefault();

    if (this.props.onSubmit !== undefined) {
      this.props.onSubmit(this.state.newItemText);
    }
    this.setState({
      newItemText: '',
    });
  };

  render() {
    return (
      <li className="list-group-item">
        <span className="form-group">
          <label htmlFor="newItemText" />
          <input type="text" className="form-control" value={this.state.newItemText} onChange={this._inputChange} />
          <button type="button" className="btn btn-secondary" onClick={this._inputSubmit}>Add</button>
        </span>
      </li>
    );
  }
}

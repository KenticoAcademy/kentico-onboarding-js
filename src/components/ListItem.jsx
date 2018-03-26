import React, { PureComponent } from 'react';

export class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      id: props.id,
      inEditMode: false,
      originalText: props.text,
    };
  }

  _setEditMode = (editMode) => {
    this.setState({
      inEditMode: editMode,
    });
  };

  _saveOriginalState = () => {
    this.setState(prevState => {
      return { originalText: prevState.text };
    });

    this._setEditMode(true);
  };

  _restoreOriginalState = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return { text: prevState.originalText };
    });

    this._setEditMode(false);
  };

  _inputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  _deleteItem = (e) => {
    e.preventDefault();
    if (this.props.onDelete !== undefined) {
      this.props.onDelete(this.state.id);
    }
  };

  _updateItem = (e) => {
    e.preventDefault();

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.state.id, this.state.text);
    }
  };

  render() {
    return (
      <li className="list-group-item">
        <span>{this.props.number}. </span>
        {this.state.inEditMode ? (
          <span className="form-group">
            <label htmlFor="itemText" />
            <input type="text" className="form-control" id="itemText" value={this.state.text} onChange={this._inputChange} />
            <button type="submit" className="btn btn-primary" onClick={(e) => this._updateItem(e)}>Save</button>
            <button type="submit" className="btn btn-secondary" onClick={(e) => this._restoreOriginalState(e)}>Cancel</button>
            <button type="submit" className="btn btn-danger" onClick={(e) => this._deleteItem(e)}>Delete</button>
          </span>)
          : (<span onClick={this._saveOriginalState}>{this.state.text}</span>
          )}
      </li>
    );
  }
}

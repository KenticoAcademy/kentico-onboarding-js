import React from 'react';

export class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      editMode: false,
    };
  }

  handleChange = (event) => this.setState({ item: { value: event.target.value, key: this.state.item.key } });

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.item) {
      this.saveEdit();
    }
  };

  cancelEdit = () => this.setState({ editMode: false, item: this.props.item });

  saveEdit = () => {
    this.props.onSave(this.state.item);
    this.setState({ editMode: false });
  };

  deleteEdit = () => {
    this.props.onDelete(this.state.item);
    this.setState({ editMode: false });
  };

  editItem = () => this.setState({ editMode: true });

  render() {
    const { item, editMode } = this.state;

    if (editMode) {
      return (
        <li className="input-group">
          <input type="text" className="form-control" value={item.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} autoFocus />
          <span className="input-group-btn">
            <button type="button" className="btn btn-primary" onClick={this.saveEdit} disabled={!item.value}>Save</button>
            <button type="button" className="btn btn-default" onClick={this.cancelEdit}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this.deleteEdit}>Delete</button>
          </span>
        </li>
      );
    }

    return <li onClick={this.editItem}>{item.value}</li>;
  }
}

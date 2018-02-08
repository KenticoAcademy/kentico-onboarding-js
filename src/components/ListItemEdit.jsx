import React from 'react';

export class ListItemEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    };
  }

  handleInputChange = (event) => this.setState({ item: event.target.value });

  handleInputKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.updateItem();
    }
    else if (event.key === 'Escape') {
      this.props.onCancel();
    }
  };

  updateItem = () => {
    const { item } = this.state;

    if (item) {
      this.props.onUpdate(item);
    }
  };

  render() {
    const { onCancel, onDelete } = this.props;
    const { item } = this.state;

    return (
      <span className="input-group">
        <input type="text" className="form-control" value={item} onChange={this.handleInputChange} onKeyUp={this.handleInputKeyUp} autoFocus />
        <span className="input-group-btn">
          <button type="button" className="btn btn-primary" onClick={this.updateItem} disabled={!item}>Save</button>
          <button type="button" className="btn btn-default" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
        </span>
      </span>
    );
  }
}

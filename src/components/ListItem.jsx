import React from 'react';
import PropTypes from 'prop-types';

export class ListItem extends React.Component {

  static propTypes = {
    item: PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onToggleEditing: PropTypes.func.isRequired,
    onItemDeletion: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      updatedValue: this.props.item.value,
    };
  }

  toggleTextEditing = () => {
    const { item } = this.props;
    this.props.onToggleEditing(item);
  };

  deleteItem = () => {
    const { item } = this.props;
    this.props.onItemDeletion(item);
  };

  modifyText = (e) => {
    this.state.updatedValue = e.target.value;
  };

  saveNewText = () => {
    this.props.item.value = this.state.updatedValue;
    this.toggleTextEditing();
  };

  render() {
    const { item } = this.props;
    if (this.props.item.isBeingEdited) {
      return (

        <div className="list-group-item" id="to-be-counted">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              defaultValue={item.value}
              onChange={this.modifyText}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.saveNewText}
            >Save
            </button>
          </div>
          <div className="form-group">
            <button
              className="btn btn-default"
              type="button"
              onClick={this.toggleTextEditing}
            >Cancel
            </button>
          </div>
          <div className="form-group">
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.deleteItem}
            >Delete
            </button>
          </div>
        </div>
      );
    }
    return (
      <div
        className="list-group-item"
        id="to-be-counted"
        onClick={this.toggleTextEditing}
      >{item.value}</div>
    );
  }
}

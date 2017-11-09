import React from 'react';
import PropTypes from 'prop-types';
import { checkEmptiness } from '../utils/checkEmptiness';

export class EditedListItem extends React.Component {

  static propTypes = {
    item: PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onToggleEditing: PropTypes.func.isRequired,
    onItemDeletion: PropTypes.func.isRequired,
    onItemSaved: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      updatedValue: this.props.item.value,
    };
  }

  onTextChanged = (e) => {
    this.setState(
      { updatedValue: e.target.value }
    );
  };

  toggleTextEditing = () => {
    const { item, onToggleEditing } = this.props;
    onToggleEditing(item);
  };

  deleteItem = () => {
    const { item, onItemDeletion } = this.props;
    onItemDeletion(item);
  };

  saveNewText = () => {
    const { item, onItemSaved } = this.props;
    onItemSaved(item, this.state.updatedValue);
  };

  render() {
    const { item } = this.props;
    return (
      <span>
        {this.props.position}
        {". "}
        <div className="input-group">
          <input
            className="form-control"
            defaultValue={item.value}
            onChange={this.onTextChanged}
          />
          <div className="input-group-btn">
            <button
              data-balloon={checkEmptiness(this.state.updatedValue) ? "Item name mustn't be empty" : null}
              data-balloon-pos="up"
              className="btn btn-primary"
              disabled={checkEmptiness(this.state.updatedValue)}
              onClick={this.saveNewText}
            >
              Save
            </button>
            <button
              className="btn btn-default"
              onClick={this.toggleTextEditing}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={this.deleteItem}
            >
              Delete
            </button>
          </div>
        </div>
      </span>);
  }
}

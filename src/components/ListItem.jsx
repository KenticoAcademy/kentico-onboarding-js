import React from 'react';
import { ListItemEditor } from './ListItemEditor';
import { ListItemDisplay } from './ListItemDisplay';

export class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      editMode: false,
    };
  }

  cancelEditing = () => this.setState({ editMode: false });

  editItem = () => this.setState({ editMode: true });
  deleteItem = () => this.props.onDelete(this.state.item);
  updateItem = (updatedItemValue) => {
    const { item } = this.state;
    item.value = updatedItemValue;
    this.props.onSave(item);

    this.setState({
      editMode: false,
    });
  };

  render() {
    const { item, editMode } = this.state;

    if (editMode) {
      return (
        <ListItemEditor
          onCancel={this.cancelEditing}
          onDelete={this.deleteItem}
          onUpdate={this.updateItem}
          item={item.value}
        />);
    }

    return (
      <ListItemDisplay
        item={item.value}
        onEdit={this.editItem}
      />);
  }
}

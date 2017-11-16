import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListItem extends PureComponent {

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onToggleEditing: PropTypes.func.isRequired,
  };

  toggleTextEditing = () => {
    const { item, onToggleEditing } = this.props;
    onToggleEditing(item.id);
  };

  render() {
    const { value } = this.props.item;
    return (
      <div
        className="form-control-static"
        onClick={this.toggleTextEditing}
      >
        {value}
      </div>
    );
  }
}

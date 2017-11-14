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
  };

  toggleTextEditing = () => {
    const { item, onToggleEditing } = this.props;
    onToggleEditing(item);
  };

  render() {
    const { item } = this.props;
    return (
      <div
        className="form-group"
        onClick={this.toggleTextEditing}
      >
        {item.value}
      </div>
    );
  }
}

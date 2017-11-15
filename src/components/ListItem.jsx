import React from 'react';
import PropTypes from 'prop-types';

export class ListItem extends React.Component {

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
    const { item } = this.props;
    return (
      <div
        className="form-control-static"
        onClick={this.toggleTextEditing}
      >
        {item.value}
      </div>
    );
  }
}

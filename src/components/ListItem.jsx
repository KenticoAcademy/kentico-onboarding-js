import React from 'react';
import PropTypes from 'prop-types';

export class ListItem extends React.Component {

  static propTypes = {
    item: PropTypes.shape({
      value: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onToggleEditing: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
  };

  toggleTextEditing = () => {
    const { item, onToggleEditing } = this.props;
    onToggleEditing(item);
  };

  render() {
    const { item } = this.props;
    return (
      <div
        onClick={this.toggleTextEditing}
      >
        {this.props.position}
        {'. '}
        {item.value}
      </div>
    );
  }
}

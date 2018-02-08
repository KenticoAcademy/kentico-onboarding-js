import React from 'react';

export class ListItemDisplay extends React.PureComponent {
  render() {
    const { item, onEdit } = this.props;
    return (
      <span className="input-group" onClick={onEdit}>
        <span className="form-control">
          {item}
        </span>
      </span>
    );
  }
}

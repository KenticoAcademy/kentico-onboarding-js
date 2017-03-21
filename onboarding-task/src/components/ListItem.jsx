import React, { PureComponent, PropTypes } from 'react';
import { LineEdit } from './LineEdit.jsx';
import { LineRead } from './LineRead.jsx';

class ListItem extends PureComponent {
  static propTypes = {
    line: PropTypes.object,
    number: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
  };
  static displayName = 'ListItem';

  _renderLineItem = (line, number) => {
    if (line.isEdited) {
      return (
        <LineEdit
          line={line}
          number={(number + 1)}
          onSave={this.props.onSave}
          onCancel={this.props.onCancel}
          onDelete={this.props.onDelete}
        />
      );
    }
    return (
      <LineRead
        line={line}
        number={(number + 1)}
        onDoubleClick={this.props.onDoubleClick}
      />
    );
  };

  render() {
    return (
      this._renderLineItem(this.props.line, this.props.number)
    );
  }
}

export { ListItem };

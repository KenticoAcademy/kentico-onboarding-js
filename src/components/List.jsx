import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Item } from './Item';

export class List extends PureComponent {
  static displayName = 'List';

  static propTypes = {
    items: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  render() {
    const itemsValueSeq = this.props.items.valueSeq();
    return (
      itemsValueSeq
        .map((item, index) => {
          return (
              <Item
                key={item.id}
                id={item.id}
                text={item.text}
                position={index + 1}
                onSave={this.props.onSave}
                onDelete={this.props.onDelete}
              />);
        }
        )
    );
  }
}

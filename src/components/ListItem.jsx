// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from '../containers/ListItemEditor';
import { ListItemDisplay } from '../containers/ListItemDisplay';
import { ListItem as ListItemModel } from '../models/listItem';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.instanceOf(ListItemModel).isRequired,
    itemKey: PropTypes.string.isRequired,
    itemValue: PropTypes.string.isRequired,
    bullet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  };

  render() {
    const { isBeingEdited, itemValue, itemKey, bullet } = this.props;

    let listItem = (
      <ListItemDisplay
        itemValue={itemValue}
        itemKey={itemKey}
        bullet={bullet}
      />
    );

    if (isBeingEdited) {
      listItem = (
        <ListItemEditor
          itemValue={itemValue}
          itemKey={itemKey}
          bullet={bullet}
        />
      );
    }

    return (
      <div>
        {listItem}
      </div>
    );
  }
}

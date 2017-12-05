import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem';

export const List = ({ itemsMap }) => {
  return (
    <div>
      {itemsMap.keySeq().map((itemKey, index) =>
        <div
          className="list-group-item form-inline"
          key={itemKey}
        >
          {index + 1}
          .
          <ListItem
            itemId={itemKey}
          />
        </div>
      )}
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemsMap: PropTypes.object.isRequired,
};

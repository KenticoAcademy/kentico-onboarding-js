import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem.jsx';

const List = ({ ids }) => {
  return (
    <div>
      {ids.map((id, index) =>
        <div
          className="list-group-item form-inline"
          key={id}
        >
          {index + 1}
          .&nbsp;
          <ListItem
            itemId={id}
          />
        </div>
      )}
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  ids: PropTypes.object.isRequired,
};

export { List };

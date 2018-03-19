// components/List.jsx

import React from 'react';

import { ListItem } from '../containers/ListItem';
import PropTypes from 'prop-types';

export const List = ({ itemKeys }) => {
  const listOfKeys = itemKeys.map((key, index) => (
    <div className="list-group-item" key={key}>
      <ListItem
        itemKey={key}
        bullet={index + 1}
      />
    </div>
  ));

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <div className="list-group">
          {listOfKeys}
        </div>
      </div>
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

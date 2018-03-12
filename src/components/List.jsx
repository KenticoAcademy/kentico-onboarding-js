// components/List.jsx

import React from 'react';

import { ListItem } from '../containers/ListItem';
import PropTypes from 'prop-types';

export const List = ({ items }) => {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <div className="list-group">
          {
            items.map((item, index) => (
              <div className="list-group-item" key={item}>
                <ListItem
                  itemKey={item}
                  bullet={index + 1}
                />
              </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  items: PropTypes.object.isRequired,
};

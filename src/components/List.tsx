// components/List.jsx

import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItem } from '../containers/ListItem';
import { NewItem } from '../containers/NewItem';
import { ListGroupActions } from '../containers/ListGroupActions';
import { key } from '../@types/key';

export interface IListStateProps {
  readonly itemKeys: Array<key>;
}

export const List: React.StatelessComponent<IListStateProps>
  = ({ itemKeys }) => {
  const listOfKeys = itemKeys.map((key, index) => (
    <div className="list-group-item" key={key}>
      <ListItem
        itemKey={key}
        bullet={(index + 1).toString()}
      />
    </div>
  ));

  return (
    <div>
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <div className="row">
          <NewItem />
        </div>
        <div className="row">
          <div className="list-group">
            {listOfKeys}
          </div>
        </div>
        <ListGroupActions />
      </div>
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemKeys: PropTypes.array.isRequired,
};

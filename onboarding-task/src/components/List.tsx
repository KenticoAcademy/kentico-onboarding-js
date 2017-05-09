import * as React from 'react';
import * as Immutable from 'immutable';
const ImmutablePropTypes = require('react-immutable-proptypes');

import { ListItem } from '../containers/ListItemContainer';
import { AddItem } from './AddItem';

interface IListDataProps {
  itemsOrder: Immutable.OrderedSet<string>;
}

interface IListCallbacksProps {
  onAddItem: (value: string) => void,
}

const List: React.StatelessComponent<IListDataProps & IListCallbacksProps> = (props) => {
  const itemsList = props.itemsOrder.toIndexedSeq().map((id: string) => (
    <li className="list-group-item" key={id}>
      <ListItem id={id}/>
    </li>)
  );

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {itemsList}
          <li className="list-group-item">
            <AddItem onAdd={props.onAddItem}/>
          </li>
        </ul>
      </div>
    </div>
  );
};

List.displayName = 'List';
List.propTypes = {
  itemsOrder: ImmutablePropTypes.orderedSetOf(
    React.PropTypes.string.isRequired
  ).isRequired,
  onAddItem: React.PropTypes.func.isRequired,
};

export { List, IListDataProps, IListCallbacksProps };

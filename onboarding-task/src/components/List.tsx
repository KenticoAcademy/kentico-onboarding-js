const ImmutablePropTypes = require('react-immutable-proptypes');
import * as React from 'react';
import * as Immutable from 'immutable';

import { ListItem } from '../containers/ListItemContainer';
import { AddItem } from './AddItem';
import { ErrorViewerContainer } from '../containers/ErrorViewerContainer';

interface IListDataProps {
  itemsOrder: Immutable.OrderedSet<string>;
}

interface IListCallbacksProps {
  onAddItem: (value: string) => void;
}

const List: React.StatelessComponent<IListDataProps & IListCallbacksProps> = (props) => {
  const itemsList = props.itemsOrder.toIndexedSeq().map((id: string) => (
    <div className="row" key={id}>
      <div className="col-sm-12 col-sm-offset-2 col-sm-8">
        <li className="list-group-item">
          <ListItem id={id}/>
        </li>
      </div>
    </div>)
  );

  return (
    <div>
      <ErrorViewerContainer />
      <ul className="list-group">
        {itemsList}
        <div className="row">
          <span className="col-sm-12 col-sm-offset-2 col-sm-8">
            <li className="list-group-item">
              <AddItem onAdd={props.onAddItem}/>
            </li>
          </span>
        </div>
      </ul>
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

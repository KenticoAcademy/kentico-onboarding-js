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

const listItemWrapper = <TProps extends { id?: string }>(Component: React.ComponentClass<TProps>, props?: TProps) => (
  <div className="row col-sm-12 col-sm-offset-2 col-sm-8" key={props && props.id}>
    <li className="list-group-item">
      <Component {...props} />
    </li>
  </div>);

const List: React.StatelessComponent<IListDataProps & IListCallbacksProps> = (props) => {
  const itemsList = props.itemsOrder.toIndexedSeq().map((id: string) => (
    listItemWrapper(ListItem, { ...props, id })
  ));

  return (
    <div>
      <ErrorViewerContainer />
      <ul className="list-group">
        {itemsList}
        {listItemWrapper(AddItem, props)}
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

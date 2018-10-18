import * as React from 'react';
import * as Immutable from 'immutable';
import * as PropTypes from 'prop-types';
import { ListItem } from '../containers/Items/ListItem';

export interface IListStateProps {
  ids: Immutable.Seq.Indexed<ItemId>;
}

const List: React.StatelessComponent<IListStateProps> = ({ids}) => (
  <div className="list">
    {ids.map((id: ItemId, index: number) =>
      <ListItem key={index}
                id={id}
                index={index}
      />
    )}
  </div>
);

List.displayName = 'List';

List.propTypes = {
  ids: PropTypes.instanceOf(Immutable.Seq.Indexed),
};

export { List };

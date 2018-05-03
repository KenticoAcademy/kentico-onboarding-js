import * as React from 'react';
import * as Immutable from 'immutable';
import * as PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem';
import { ItemId } from '../models/ItemId';

interface  IListDataProps {
  ids: Immutable.Seq.Indexed<ItemId>;
}

const List: React.StatelessComponent<IListDataProps> = ({ ids }) => (
    <div>
      {ids.map((id: ItemId, index: number) =>
          <ListItem key={index}
            id={id} index={index}
          />
      )}
    </div>
  );

List.displayName = 'List';

List.propTypes = {
  ids: PropTypes.instanceOf(Immutable.Seq.Indexed),
};

export { List };

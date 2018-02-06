import * as React from 'react';
import * as Immutable from 'immutable';
import { ListItem } from '../containers/ListItem';
import { ItemId } from '../models/ItemId';
import ImmutablePropTypes = require('react-immutable-proptypes');

interface  IListDataProps {
  ids: Immutable.Seq.Indexed<ItemId>;
}

const List: React.StatelessComponent<IListDataProps> = ({ ids }) => (
    <div>
      {ids.map((id: ItemId, index: number) =>
        <div
          className="list-group-item form-inline"
          key={id}
        >
          {index + 1}
          .&nbsp;
          <ListItem
            id={id}
          />
        </div>
      )}
    </div>
  );

List.displayName = 'List';

List.propTypes = {
  ids: ImmutablePropTypes.seq,
};

export { List };

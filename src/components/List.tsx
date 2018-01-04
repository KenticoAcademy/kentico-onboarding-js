import * as React from 'react';
import { Seq } from 'immutable';
import { ListItem } from '../containers/ListItem';
import { ItemId } from '../models/ItemId';
const ImmutablePropTypes = require('react-immutable-proptypes');

interface  IListDataProps {
  ids: Seq.Indexed<ItemId>;
}

const List: React.SFC<IListDataProps> = ({ ids }: IListDataProps): JSX.Element => {
  return (
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
};

List.displayName = 'List';

List.propTypes = {
  ids: ImmutablePropTypes.seq.isRequired,
};

export { List };

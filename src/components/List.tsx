import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Seq } from 'immutable';
import { ListItem } from '../containers/ListItem';

interface  IListDataProps {
  ids: Seq.Indexed<string>;
}

const List: React.SFC<IListDataProps> = ({ ids }: IListDataProps): JSX.Element => {
  return (
    <div>
      {ids.map((id: string, index: number) =>
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
  ids: PropTypes.object.isRequired,
};

export { List };

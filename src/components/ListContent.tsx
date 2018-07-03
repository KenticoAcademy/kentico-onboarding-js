import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Error } from '../containers/Error';
import { ListItem } from '../containers/ListItem';
import { NewItem } from '../containers/NewItem';
import { ListGroupActions } from '../containers/ListGroupActions';
import { GUID_GLOBAL_ERROR } from '../constants/constants';

export interface IListContentStateProps {
  readonly itemKeys: Array<Key>;
}

export class ListContent extends React.PureComponent<IListContentStateProps> {
  static displayName = 'ListContent';

  static propTypes = {
    itemKeys: PropTypes.array.isRequired,
  };

  render() {
    const listOfKeys = this.props.itemKeys
      .reverse()
      .map((key, index) => (
          <div className="list-group-item" key={key}>
            <ListItem
              itemKey={key}
            bullet={(index + 1).toString()}
            />
          </div>
      ));

    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <div className="row">
          <NewItem />
        </div>
        <div className="row">
          <div className="list-group">
            {listOfKeys}
          </div>
          <Error itemKey={GUID_GLOBAL_ERROR} retry={true} />
        </div>
        <ListGroupActions />
      </div>
    );
  }
}

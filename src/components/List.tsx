import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import { Error } from '../containers/Error';
import { ListItem } from '../containers/ListItem';
import { NewItem } from '../containers/NewItem';
import { ListGroupActions } from '../containers/ListGroupActions';
import { Key } from '../@types/Key';

export interface IListStateProps {
  readonly itemKeys: Array<Key>;
  readonly dataLoaded: boolean;
}

export interface IListDispatchProps {
  readonly getItems: () => void;
}
interface IListProps extends IListStateProps, IListDispatchProps {}

export class List extends React.PureComponent<IListProps> {
  static displayName = 'List';

  static propTypes = {
    itemKeys: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    setTimeout(() => this.props.getItems(), 2000);
  }

  render() {
    const listOfKeys = this.props.itemKeys.reverse().map((key, index) => (
      <div className="list-group-item" key={key}>
        <ListItem
          itemKey={key}
          bullet={(index + 1).toString()}
        />
      </div>
    ));

    return (
      (this.props.dataLoaded)
        ?
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div className="row">
            <NewItem />
          </div>
          <div className="row">
            <div className="list-group">
              {listOfKeys}
            </div>
            <Error itemKey={undefined} />
          </div>
          <ListGroupActions />
        </div>
        :
        <div className="loader">
            <ReactLoading type="spinningBubbles" color="#D3D3D3" />
        </div>
    );
  }
}

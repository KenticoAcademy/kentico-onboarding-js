import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from '../../containers/list/items/Item';
import { NewItem } from '../../containers/list/items/NewItem';
import { ListError } from './ListError';
import { ListLoader } from './ListLoader';

export interface IListStateProps {
  readonly items: Array<Uuid>;
  readonly isFetching: boolean;
  readonly fetchingItemsFail: boolean;
}

export interface IListDispatchProps {
  readonly initItems: () => void;
}

type ListProps = IListDispatchProps & IListStateProps;

export class List extends React.PureComponent<ListProps> {
  static displayName = 'List';

  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchingItemsFail: PropTypes.bool.isRequired,
    initItems: PropTypes.func.isRequired,
  };

  componentDidMount(): void {
    this.props.initItems();
  }

  render(): JSX.Element {
    if (this.props.fetchingItemsFail) {
      return <ListError retry={this.props.initItems} />;
    }

    if (this.props.isFetching) {
      return <ListLoader />;
    }

    const renderItems: Array<JSX.Element> = this.props.items
      .map((id: Uuid, index: number) => (
        <Item
          key={id}
          id={id}
          index={index + 1}
        />
      ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {renderItems}
            <NewItem />
          </ul>
        </div>
      </div>
    );
  }
}

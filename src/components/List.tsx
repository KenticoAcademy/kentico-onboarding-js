import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Item } from '../containers/Item';
import { AddItem } from '../containers/AddItem';
import { ListSorting, getListSortingArray } from '../constants/ListSorting';

export interface IListStateProps {
  readonly itemIds: Uuid[];
  readonly sorting: ListSorting;
}

export interface IListOwnProps {
  readonly lastRenderTime: Time;
  readonly onPropsChanged: () => void;
}

export interface IListDispatchProps {
  readonly onSetListView: (view: ListSorting) => void;
}

type IListProps = IListStateProps & IListDispatchProps & IListOwnProps;

export class List extends React.Component<IListProps> {
  static displayName = 'List';

  static propTypes = {
    itemIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    sorting: PropTypes.oneOf(getListSortingArray()).isRequired,
    lastRenderTime: PropTypes.string.isRequired,
    onSetListView: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps: IListProps): boolean {
    const shouldUpdate = this.props.sorting !== nextProps.sorting
                        || this.props.itemIds !== nextProps.itemIds
                        || this.props.lastRenderTime !== nextProps.lastRenderTime;
    if (shouldUpdate) {
      nextProps.onPropsChanged();
    }

    return shouldUpdate;
  }

  private changeViewToCreatedTime = () => this.props.onSetListView(ListSorting.CreatedTime);

  private changeViewToLastUpdateTime = () => this.props.onSetListView(ListSorting.LastUpdateTime);

  render(): JSX.Element {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-16">
          <ul className="nav nav-tabs border-info">
            <li className="nav-item">
              <div
                className={this.props.sorting === ListSorting.CreatedTime ? 'nav-link active border-info border-bottom-0 text-info' : 'nav-link'}
                onClick={this.changeViewToCreatedTime}
              >Created time
              </div>
            </li>
            <li className="nav-item">
              <div
                className={this.props.sorting === ListSorting.LastUpdateTime ? 'nav-link active border-info border-bottom-0 text-info' : 'nav-link'}
                onClick={this.changeViewToLastUpdateTime}
              >Last update time
              </div>
            </li>
          </ul>
          <ul className="list-group list-group-flush border border-info rounded-bottom">
            <AddItem />
            {
              this.props.itemIds.map((id: Uuid) => (
                <Item
                  key={id}
                  id={id}
                  lastRenderTime={this.props.lastRenderTime}
                  onItemPropsChanged={this.props.onPropsChanged}
                />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

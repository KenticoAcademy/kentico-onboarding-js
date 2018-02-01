import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AddedItem } from '../../containers/todo-list/AddedItem';
import { Error } from '../../containers/todo-list/Error';
import { Item } from '../../containers/todo-list/Item';
import { Seq } from 'immutable';
import { Uuid } from '../../utils/generateId';

export interface IListDataProps {
  readonly ids: Seq.Indexed<Uuid>;
  fetchFailed: boolean;
}

export interface IListCallbackProps {
  readonly onFetchItems: () => void;
}
export class List extends React.PureComponent<IListDataProps & IListCallbackProps> {
  static propTypes = {
    ids: PropTypes.instanceOf(Seq).isRequired,
    isFetching: PropTypes.bool,
  };

  constructor(props: IListDataProps & IListCallbackProps) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchItems();
  }

  render(): JSX.Element {
    return (
      <div className="row">
        {!this.props.fetchFailed
          ? <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ul className="list-group">
              {this.props.ids
                .map((id: Uuid, index: number) =>
                  <li
                    className="list-group-item"
                    key={id}
                  >
                    <Item
                      id={id}
                      index={index + 1}
                    />
                  </li>,
                )
              }
              <AddedItem />
            </ul>
          </div>
          : <Error />
        }
      </div>
    );
  }
}

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AddedItem } from '../../containers/todo-list/item/AddedItem';
import { Item } from '../../containers/todo-list/item/Item';
import { Seq } from 'immutable';
import { Uuid } from '../../utils/generateId';

export interface IListDataProps {
  readonly ids: Seq.Indexed<Uuid>;
}

export class ItemsList extends React.PureComponent<IListDataProps> {
  static propTypes = {
    ids: PropTypes.instanceOf(Seq).isRequired,
  };

  constructor(props: IListDataProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
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
      </div>
    );
  }
}

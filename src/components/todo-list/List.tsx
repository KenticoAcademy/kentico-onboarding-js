import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AddedItem } from '../../containers/todo-list/AddedItem';
import { TsComponent } from './TsComponent';
import { Item } from '../../containers/todo-list/Item';
import { Seq } from 'immutable';
import { Uuid } from '../../utils/generateId';

export interface IListDataProps {
  readonly ids: Seq.Indexed<Uuid>;
}

const List: React.SFC<IListDataProps> = (props: IListDataProps): JSX.Element =>
  <div className="row">
    <div className="row">
      <div className="col-sm-12 text-center">
        <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
      </div>
    </div>
    <div className="col-sm-12 col-md-offset-2 col-md-8">
      <ul className="list-group">
        {props.ids
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
  </div>;

List.propTypes = {
  ids: PropTypes.instanceOf(Seq).isRequired,
};

export { List }

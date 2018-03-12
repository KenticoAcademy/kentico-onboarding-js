import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AddedItem } from '../../containers/todo-list/AddedItem';
import { Item } from '../../containers/todo-list/Item';
import { Seq } from 'immutable';
import { Uuid } from '../../utils/generateId';
import { Error } from './Error';
import { IAction } from '../../actions/IAction';

export interface IListDataProps {
  readonly ids: Seq.Indexed<Uuid>;
  readonly postError: boolean;
  readonly message: string;
}

export interface IListCallbackProps {
  onPostErrorClose: () => IAction;
}

export class List extends React.PureComponent<IListDataProps & IListCallbackProps> {
  static propTypes = {
    ids: PropTypes.instanceOf(Seq).isRequired,
  };

  constructor(props: IListDataProps & IListCallbackProps) {
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
            {(this.props.postError)
              ? <Error
                errorMessage={this.props.message}
                onCloseError={this.props.onPostErrorClose}
              />
              : <span />
            }
            <AddedItem />
          </ul>
        </div>
      </div>
    );
  }
}

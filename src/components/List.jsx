import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { EditedListItem } from './EditedListItem';
import { toggleEditing } from '../utils/actionCreators';

export class List extends PureComponent {

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const state = store.getState();

    return (<div>{
        state.map((item, index) => (
          <div
            className="list-group-item form-inline"
            key={item.id}
          >{index + 1}
            {'. '}
            {item.isBeingEdited ?
              <EditedListItem
                item={item}
              /> : <ListItem
                text={item.text}
                onClick={() => store.dispatch(toggleEditing(item.id, item.isBeingEdited))}
              />}
          </div>
        ))
      }</div>
    );
  }
}

List.contextTypes = {
  store: React.PropTypes.object,
};

// components/List.jsx

import React from 'react';

import { ListItem } from '../containers/ListItem';

export class List extends React.PureComponent {
  static displayName = 'List';

  render() {
    const list = this.props.items.entrySeq()
      .map((item, index) => (
        <div className="list-group-item" key={item[0]}>
          <ListItem
            itemKey={item[0]}
            bullet={index + 1}
          />
        </div>
      ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div className="list-group">
            {list}
          </div>
        </div>
      </div>
    );
  }
}

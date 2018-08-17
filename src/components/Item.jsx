import React, { PureComponent } from 'react';
import { EditItem } from './EditItem';
import { ShowItem } from './ShowItem';

export class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  _startEditItem = () => {
    this.setState({ edit: true });
  };

  _finishEditItem = () => {
    this.setState({ edit: false });
  };

  render() {
    return (
      <li
        className="list-group-item"
      >
        {this.state.edit
          ? (
            <EditItem
              pos={this.props.pos}
              text={this.props.text}
              finishEdit={this._finishEditItem}
              onSave={this.props.onSave}
              onDelete={this.props.onDelete}
            />)
          : (
            <ShowItem
              handlerClick={this._startEditItem}
              pos={this.props.pos}
              text={this.props.text}
            />)
        }
      </li>
    );
  }
}

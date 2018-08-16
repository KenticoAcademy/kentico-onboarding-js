import React, { PureComponent } from 'react';
import assignment from '../../public/images/assignment.gif';
import { TsComponent } from './TsComponent.tsx';

export class List extends PureComponent {
  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">
              Desired functionality is captured in the gif image.
            </p>
            <p className="lead text-center">
              <b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item like <code>dateCreated</code>).
            </p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" invisible />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <Board />
          </div>
        </div>
      </div>
    );
  }
}

class Board extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: 'Dog' },
        { id: 2, text: 'Cat' },
        { id: 3, text: 'Elephant' }
      ]
    };
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.state.items.map((item, index) => <Item id={item.id} text={item.text} pos={index + 1}/>)}
          <li className="list-group-item">
            <EditItem />
          </li>
          <li className="list-group-item">
            <AddItem />
          </li>
        </ul>
      </div>
    );
  }
}

function Item(props) {
  return (
    <li className="list-group-item" key={props.id}>
      {props.pos + ". " + props.text}
    </li>);
}

class AddItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this._updateValue = this._updateValue.bind(this);
  }

  _addItem = () => {
    console.log('value: ' + this.state.value);
  }

  _updateValue(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="text"
            value={this.state.value}
            onChange={this._updateValue}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this._addItem}
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

class EditItem extends PureComponent {
  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          1.{' '}
          <input
            type="text"
            className="form-control"
            id="text"
          />
          <button
            type="button"
            className="btn btn-primary"
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-default"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </form>
    );
  }
}

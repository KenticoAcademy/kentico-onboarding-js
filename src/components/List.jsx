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
            <img
              src={assignment}
              alt="assignment"
              className="img--assignment"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent
              name="𝕱𝖆𝖓𝖈𝖞"
              invisible
            />
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
        {
          id: 1,
          text: 'Dog'
        },
        {
          id: 2,
          text: 'Cat'
        },
        {
          id: 3,
          text: 'Elephant'
        }
      ],
      counter: 4
    };
  }

  _editItem = (pos, text) => {
    const updatedItemsArray = [...this.state.items];
    updatedItemsArray[pos - 1].text = text;

    console.log('Board -> edirItem()');

    this.setState(() => ({
      items: updatedItemsArray
    }));
  }

  _addItem = (text) => {
    console.log('Board: Add item ' + this.state.counter + ' - ' + text);
    this.setState(prevState => ({
      items: [
        ...prevState.items,
        {
          'id': prevState.counter,
          'text': text
        }
      ],
      counter: prevState.counter + 1
    }));
  };

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.state.items.map((item, index) => (
            <Item
              key={item.id}
              id={item.id}
              text={item.text}
              pos={index + 1}
              onSave={this._editItem}
            />))}
          <li className="list-group-item">
            <EditItem />
          </li>
          <li className="list-group-item">
            <AddItem onChange={this._addItem} />
          </li>
        </ul>
      </div>
    );
  }
}

class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  _startEditItem = () => {
    console.log('Pos. of click li: ' + this.props.id);
    this.setState({ edit: true });
  };

  _finishEditItem = () => {
    console.log('Finish editItem -> li: ' + this.props.id);
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

function ShowItem(props) {
  return (
    <div
      onClick={props.handlerClick}
      role="presentation"
    >
      {props.pos + ". "}{props.text}
    </div>
  );
}

class AddItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  _addItem = () => {
    this.props.onChange(this.state.value);
    console.log('value: ' + this.state.value);
  };

  _updateValue = (event) => {
    this.setState({ value: event.target.value });
  };

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
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
  }

  _saveItem = () => {
    this.props.onSave(this.props.pos, this.state.text);
    this.props.finishEdit();
  }

  _textEdit = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          {this.props.pos + '. '}
          <input
            type="text"
            className="form-control"
            id="text"
            value={this.state.text}
            onChange={this._textEdit}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this._saveItem}
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

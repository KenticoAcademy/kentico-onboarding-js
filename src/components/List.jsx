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
  render() {
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            <EditItem />
          </li>
          <li className="list-group-item">1. Dapibus ac facilisis in</li>
          <li className="list-group-item">2. Morbi leo risus</li>
          <li className="list-group-item">3. Porta ac consectetur ac</li>
          <li className="list-group-item">4. Vestibulum at eros</li>
          <li className="list-group-item">
            <AddItem />
          </li>
        </ul>
      </div>
    );
  }
}

class AddItem extends PureComponent {
  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="text"
          />
          <button
            type="button"
            className="btn btn-primary"
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
            Cancle
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

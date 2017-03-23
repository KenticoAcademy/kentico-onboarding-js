import React, { Component } from 'react';
import assignment from './../../../assignment.gif';

import TsComponent from './TsComponent.tsx';

class List extends Component {
  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured on the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
              {/* TODO: implement the list here :)*/ }
              <ListItem />
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Placeholder',
      added: false,
    };
    this.changeAddState = this.changeAddState.bind(this);
  }
  changeAddState() {
    this.setState({ added: true });
  }

  render() {
    let alreadyAdded = this.state.added;
    return (
      <div>
        <textarea>{this.state.text}</textarea>
        <button hidden={alreadyAdded} onClick={this.changeAddState}>Add</button>
        <button hidden={!alreadyAdded}>Save</button>
        <button hidden={!alreadyAdded}>Cancel</button>
        <button hidden={!alreadyAdded}>Delete</button>
      </div>
    );
  }
}

export default List;

import React from 'react';

export class NewItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { item: '' };
  }

  handleChange = (event) => this.setState({ item: event.target.value });

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.item) {
      this.addItem();
    }
  };

  addItem = () => {
    this.props.onCreate(this.state.item);
    this.setState({ item: '' });
  };

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="What is on your mind ... ?" value={this.state.item} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default" onClick={this.addItem} disabled={!this.state.item}>Add</button>
        </span>
      </div>
    );
  }
}

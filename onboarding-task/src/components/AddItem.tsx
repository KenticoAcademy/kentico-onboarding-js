import * as React from 'react';

interface IAddItemProps {
  onAddItem: (value: string) => void;
}

interface IAddItemState {
  inputValue: string;
}

class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItem';

  static propTypes = { onAddItem: React.PropTypes.func.isRequired };

  constructor(props: IAddItemProps) {
    super(props);
    this.state = { inputValue: '' };
  }

  _inputChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.currentTarget.value });
  };

  _addItem = () => {
    this.props.onAddItem(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const value = this.state.inputValue;
    return (
      <div className="form-inline">
        <div className="form-group">
          <input className="form-control" value={value} onChange={this._inputChange}/>
          <button className="btn btn-default" onClick={this._addItem}>Add</button>
        </div>
      </div>
    );
  }
}

export { AddItem };

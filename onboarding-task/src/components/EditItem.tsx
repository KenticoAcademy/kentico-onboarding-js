import * as React from 'react';

interface IEditItemProps {
  value: string;
  index: number;
  onEdit: (value: string) => void;
  onDelete: () => void;
  onCancel: () => void;
}

interface IEditItemState {
  inputValue: string;
}

class EditItem extends React.PureComponent<IEditItemProps, IEditItemState> {
  static displayName = 'EditItem';

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  };

  constructor(props: IEditItemProps) {
    super(props);
    this.state = { inputValue: this.props.value };
  }

  _inputChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.currentTarget.value });
  };

  _saveValue = () => {
    this.props.onEdit(this.state.inputValue);
  };

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          {this.props.index}.
          <input className="form-control" type="text" value={this.state.inputValue} onChange={this._inputChange}/>
          <button type="submit" className="btn btn-primary" onClick={this._saveValue}>Save</button>
          <button className="btn btn-default" onClick={this.props.onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

export { EditItem };

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ListItemEditMode extends PureComponent {
  constructor(props) {
    super(props);

    const { text, number } = this.props;

    this.state = {
      text,
      number,
    };
  }

  onInputChange = (e) => this.setState({ text: e.target.value });

  onSave = () => {
    const { text } = this.state;
    this.props.onSave(text);
  };

  render() {
    const { text, number } = this.state;

    return (
      <div className="form-inline">
        <label>
          {number}{'. '}
        </label>

        <input
          className="form-control"
          type="text"
          value={text}
          onChange={this.onInputChange}
        />

        <button
          className="btn btn-primary"
          onClick={this.onSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>

        <button
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

ListItemEditMode.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { ListItemEditMode };

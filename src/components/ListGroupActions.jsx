import React from 'react';
import PropTypes from 'prop-types';

export class ListGroupActions extends React.PureComponent {
  static displayName = 'ListGroupActions';

  static propTypes = {
    selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    saveSelected: PropTypes.func.isRequired,
    cancelSelected: PropTypes.func.isRequired,
    deleteSelected: PropTypes.func.isRequired,
  };

  _saveSelected = () => this.props.saveSelected(this.props.selectedKeys);

  _cancelSelected = () => this.props.cancelSelected(this.props.selectedKeys);

  _deleteSelected = () => this.props.deleteSelected(this.props.selectedKeys);

  render() {
    const { selectedKeys } = this.props;

    return (
      (selectedKeys.length > 1) ? (
        <div className="row">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this._saveSelected}
            >
              Save Selected
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={this._cancelSelected}
            >
              Cancel Selected
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this._deleteSelected}
            >
              Delete Selected
            </button>
          </div>
        </div>
      ) : null
    );
  }
}

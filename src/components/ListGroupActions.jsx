import React from 'react';
import PropTypes from 'prop-types';

export const ListGroupActions = ({ saveSelected, cancelSelected, deleteSelected, selectedKeys }) => (
  (selectedKeys.length > 1) && (
    <div className="row">
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={saveSelected}
        >
          Save Selected
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={cancelSelected}
        >
          Cancel Selected
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteSelected}
        >
          Delete Selected
        </button>
      </div>
    </div>)
);

ListGroupActions.displayName = 'ListGroupActions';

ListGroupActions.propTypes = {
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveSelected: PropTypes.func.isRequired,
  cancelSelected: PropTypes.func.isRequired,
  deleteSelected: PropTypes.func.isRequired,
};

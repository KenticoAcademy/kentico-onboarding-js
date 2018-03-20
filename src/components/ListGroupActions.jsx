import React from 'react';
import PropTypes from 'prop-types';

export const ListGroupActions = ({ isGroupVisible, saveAll, cancelAll, deleteAll }) => (
  isGroupVisible ?
    <div className="row">
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={saveAll}
        >
          Save Selected
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={cancelAll}
        >
          Cancel Selected
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteAll}
        >
          Delete Selected
        </button>
      </div>
    </div> :
    <div className="row" />
);

ListGroupActions.displayName = 'ListGroupActions';

ListGroupActions.propTypes = {
  isGroupVisible: PropTypes.bool.isRequired,
  saveAll: PropTypes.func.isRequired,
  cancelAll: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired,
};
